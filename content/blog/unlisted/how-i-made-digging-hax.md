---
title: "Guide to Your First UE5 DLL Cheat"
date: "2026-03-05"
description: "I've been learning Unreal Engine C++ for about a month. Thought making a cheat for a $5 indie UE5 game would be a good exercise. Here's how that went."
related: ["how-to-start-game-hacking", "how-to-start-reverse-engineering", "how-i-made-repo-hax"]
---

I've been learning Unreal Engine C++ for about a month. School project, Bomberman3D, the whole thing. At some point I thought - making a cheat for a UE5 game would probably teach me more about how the engine actually works under the hood than just following tutorials.

So I picked [A Game About Digging A Hole](https://store.steampowered.com/app/3244220/A_Game_About_Digging_A_Hole/). $5 indie game, no anti-cheat, UE 5.5.4. The grind to max everything out is like 20 hours. I did it in an afternoon instead.

This is different from my [REPO cheat post](/blog/how-i-made-repo-hax). That was Unity Mono - you open dnSpy, read the C#, done. UE5 is native code. No free source code handout. You actually have to work for it.

> [!NOTE]
> Source code is [on GitHub](https://github.com/michal-flaska/digging-hax). Also why I used Dumper-7 instead of UEDumper - UEDumper requires you to manually reverse engineer the binary first. Dumper-7 reads UE's own reflection data and generates the SDK automatically. Way simpler for a first project.

## Tools

- [Dumper-7](https://github.com/Encryqed/Dumper-7) - SDK generator, injects into the running game and dumps everything
- Visual Studio 2022 - DLL project, x64 Release, C++20
- Any DLL injector - tested with Xenos and ExtremeInjector

## Generating the SDK

First step is getting the SDK. Dumper-7 works by injecting into the running game and reading UE's reflection system (GObjects/GNames). It generates a full C++ SDK with all the classes, properties, and offsets from the game.

1. Build Dumper-7 from source
2. Launch the game, load a save
3. Inject `Dumper-7.dll`
4. SDK dumps to `C:\Dumper-7\5.5.4-0+UE5-DiggingGame\`

Now you have a folder full of generated C++ headers. Every class in the game, every property, every function - all with correct offsets. No pattern scanning needed.

## Project Setup

Create a DLL project in Visual Studio. x64 Release, C++20. Drag the entire SDK folder into your project.

Three SDK `.cpp` files need special treatment - `Basic.cpp`, `CoreUObject_functions.cpp`, and `Engine_functions.cpp`. Right-click each one → Properties → C/C++ → Precompiled Headers → **Not Using Precompiled Headers**. If you skip this step you'll get a wall of PCH errors.

Your `cheat.h` just includes the SDK headers you need:

```cpp:cheat.h
#pragma once
#include "pch.h"
#include "5.5.4-0+UE5-DiggingGame/CppSDK/SDK/Basic.hpp"
#include "5.5.4-0+UE5-DiggingGame/CppSDK/SDK/Engine_classes.hpp"
#include "5.5.4-0+UE5-DiggingGame/CppSDK/SDK/Engine_structs.hpp"
#include "5.5.4-0+UE5-DiggingGame/CppSDK/SDK/CubicDestruction_FirstPersonCharacter_classes.hpp"
#include "5.5.4-0+UE5-DiggingGame/CppSDK/SDK/BP_Dynamite_classes.hpp"
#include "5.5.4-0+UE5-DiggingGame/CppSDK/SDK/BP_DynamiteBIG_classes.hpp"

void CheatLoop();
```

And `dllmain.cpp` is basically the same for every DLL cheat - attach, create thread, run your loop:

```cpp:dllmain.cpp
DWORD WINAPI MainThread(LPVOID lpParam)
{
    CheatLoop();
    return 0;
}

BOOL APIENTRY DllMain(HMODULE hModule, DWORD ul_reason_for_call, LPVOID lpReserved)
{
    if (ul_reason_for_call == DLL_PROCESS_ATTACH)
    {
        DisableThreadLibraryCalls(hModule);
        CreateThread(nullptr, 0, MainThread, hModule, 0, nullptr);
    }
    return TRUE;
}
```

## The SDK Bug

First compile, immediately hit this:

```
error C2327: 'SDK::ACubicDestruction_FirstPersonCharacter_C::ENUM_Ores':
is not a type name, static, or enumerator
```

Naming collision in the generated SDK. The class had a member variable called `ENUM_Ores` and a function parameter also typed `ENUM_Ores`. MSVC choked on it.

Fix was one line in `CubicDestruction_FirstPersonCharacter_classes.hpp` around line 502:

```cpp
// broken
void DestroyOreInInventory(ENUM_Ores OreToDestroy);

// fixed
void DestroyOreInInventory(SDK::ENUM_Ores OreToDestroy);
```

Known Dumper-7 quirk. Generated SDKs sometimes have these conflicts, you just manually fix them. I figured it out by looking at the SDK header and seeing the collision, then verified I was right.

## Walking the UE Object Chain

This is the thing nobody explains well. Every UE game has the same structure. You always start from `UWorld` and walk down:

```
GObjects → UWorld → GameInstance → LocalPlayers[0] → PlayerController → Pawn
```

In code:

```cpp:cheat.cpp
SDK::UWorld* World = SDK::UWorld::GetWorld();
if (!World) { Sleep(500); continue; }

SDK::APlayerController* PC = World->OwningGameInstance->LocalPlayers[0]->PlayerController;
if (!PC) { Sleep(500); continue; }

auto* Player = static_cast<SDK::ACubicDestruction_FirstPersonCharacter_C*>(PC->Pawn);
if (!Player) { Sleep(500); continue; }
```

`GetWorld()` is implemented in `Basic.cpp` - it reads the global `GWorld` pointer that UE always maintains. From there you navigate the chain. The cast at the end converts the generic `APawn` pointer to the game's specific player class so you can access game-specific properties.

Once you have the player pointer, writing values is just... writing values:

```cpp:cheat.cpp
Player->DrillStrength          = 9999.0;
Player->DrillStrengthAfterNerf = 9999.0;
Player->WeaponDamage           = 9999.0;
Player->DigRadius              = 500;
Player->CurHealth              = 99999.0;
Player->MaxHealth              = 99999.0;
Player->Money                  = 99999;
```

The SDK gives you the offsets. You just use properties like normal C++ member variables. That's the whole point of generating it.

## Dynamite Radius - Scanning GObjects

The dynamite actors aren't on the player, they're spawned in the world. So you can't just walk the player chain. You have to scan all objects.

```cpp:cheat.cpp
for (int i = 0; i < SDK::UObject::GObjects->Num(); i++)
{
    SDK::UObject* Obj = SDK::UObject::GObjects->GetByIndex(i);
    if (!Obj) continue;

    if (Obj->IsA(SDK::ABP_Dynamite_C::StaticClass()))
        static_cast<SDK::ABP_Dynamite_C*>(Obj)->ExplosionRadius = 500.0;

    if (Obj->IsA(SDK::ABP_DynamiteBIG_C::StaticClass()))
        static_cast<SDK::ABP_DynamiteBIG_C*>(Obj)->ExplosionRadius = 500.0;
}
```

`GObjects` is UE's global object array. Every UObject that exists in the game is in there. `IsA()` checks the class type. This runs every 100ms so newly spawned dynamite gets patched immediately.

## RGB World - The Dead End First

I wanted a rainbow post-process effect. Obvious approach: find `APostProcessVolume` in GObjects and modify it.

Wrote the scan, ran it, dumped the count to a file.

Zero results. The game just doesn't use a PostProcessVolume. Half an hour wasted. Eventually said fuck it and looked at what else could work.

The player has a `UCameraComponent`. Camera components in UE have their own `PostProcessSettings`. Modifying that affects everything the camera renders.

```cpp:cheat.cpp
auto* CamComp = static_cast<SDK::UCameraComponent*>(
    Player->GetComponentByClass(SDK::UCameraComponent::StaticClass()));

static float t = 0.0f;
t += 0.2f;

if (CamComp)
{
    auto& PP = CamComp->PostProcessSettings;
    PP.bOverride_ColorGain = 1; // important - if this is 0, UE ignores your value entirely

    PP.ColorGain.X = 1.0f + sinf(t) * 0.8f;           // R
    PP.ColorGain.Y = 1.0f + sinf(t + 2.094f) * 0.8f;  // G
    PP.ColorGain.Z = 1.0f + sinf(t + 4.189f) * 0.8f;  // B
    PP.ColorGain.W = 1.0f;

    CamComp->PostProcessBlendWeight = 1.0f;
}
```

The `2.094` and `4.189` are `2π/3` and `4π/3` - evenly spaced phase offsets so R, G, B cycle out of sync with each other. That's what gives the rainbow shift instead of everything pulsing the same color.

One thing that burned me: `bOverride_ColorGain` has to be set to `1`. Every property in `FPostProcessSettings` has a corresponding `bOverride_X` bitfield. If it's `0`, UE ignores your value completely and uses its own default. Spent a bit confused why nothing was changing before I noticed this.

## Fly Mode - Two Bugs

First version: set `MOVE_Flying` every frame, set `GravityScale = 0` every frame.

Bug 1: On injection, even before pressing F2, the character's movement felt wrong. Setting `MOVE_Walking` every frame (which I was doing to "ensure" the default state) was constantly fighting the engine's own movement system. Fixed with a `flyWasActive` bool - only touch the movement mode on actual toggle, not every frame.

Bug 2: Toggle fly off, gravity doesn't restore. Fixed by explicitly setting `GravityScale = 1.0f` and `MOVE_Walking` on toggle off, but only once:

```cpp:cheat.cpp
if (flyMode && Movement)
{
    // ... movement code ...
    Movement->GravityScale = 0.0f;
    Movement->SetMovementMode(SDK::EMovementMode::MOVE_Flying, 0);
    flyWasActive = true;
}
else if (flyWasActive && Movement)
{
    Movement->GravityScale = 1.0f;
    Movement->SetMovementMode(SDK::EMovementMode::MOVE_Walking, 0);
    flyWasActive = false;
}
```

Also `MOVE_Flying` in UE still applies some residual lift/buoyancy. You'll get slowly pushed upward even with `GravityScale = 0`. Didn't bother fixing it, it's minor.

## Rotation-Aware Movement

Fly mode uses numpad. The movement has to be relative to where you're looking, otherwise forward is always world-forward regardless of camera rotation.

The SDK's `FRotator` doesn't have `GetForwardVector()`. So I implemented it manually:

```cpp:cheat.cpp
SDK::FVector RotToForward(SDK::FRotator rot)
{
    float pitch = rot.Pitch * (3.14159f / 180.0f);
    float yaw   = rot.Yaw   * (3.14159f / 180.0f);
    return { cosf(pitch) * cosf(yaw), cosf(pitch) * sinf(yaw), sinf(pitch) };
}

SDK::FVector RotToRight(SDK::FRotator rot)
{
    float yaw = rot.Yaw * (3.14159f / 180.0f);
    return { -sinf(yaw), cosf(yaw), 0.0f };
}
```

Standard pitch/yaw to XYZ conversion. UE yaw is in degrees so multiply by `π/180` first. The right vector had inverted left/right on first attempt - flipped the sign on `sinf(yaw)` and it was correct.

Then movement is just:

```cpp:cheat.cpp
SDK::FRotator rot = PC->GetControlRotation();
SDK::FVector forward = RotToForward(rot);
SDK::FVector right   = RotToRight(rot);
SDK::FVector vel     = { 0.0f, 0.0f, 0.0f };

if (GetAsyncKeyState(VK_NUMPAD8) & 0x8000) { vel.X += forward.X * 2000.0f; vel.Y += forward.Y * 2000.0f; }
if (GetAsyncKeyState(VK_NUMPAD2) & 0x8000) { vel.X -= forward.X * 2000.0f; vel.Y -= forward.Y * 2000.0f; }
if (GetAsyncKeyState(VK_NUMPAD4) & 0x8000) { vel.X -= right.X  * 2000.0f;  vel.Y -= right.Y  * 2000.0f; }
if (GetAsyncKeyState(VK_NUMPAD6) & 0x8000) { vel.X += right.X  * 2000.0f;  vel.Y += right.Y  * 2000.0f; }
if (GetAsyncKeyState(VK_NUMPAD7) & 0x8000) vel.Z =  2000.0f;
if (GetAsyncKeyState(VK_NUMPAD1) & 0x8000) vel.Z = -2000.0f;

Movement->Velocity = vel;
```

## What Didn't Work

**Jetpack zone restriction** - the game shows "CAN'T USE JETPACK HERE" in certain areas. Even with `JetpackPower = 99999` and `JetpackUnlocked_ = true` maxed out, the restriction still triggers. It's pure blueprint logic, not exposed as a property. Bypassing it would require hooking `ProcessEvent` or patching bytecode. Not worth it for a $5 game.

**`ViewTarget.POV` post process** - first attempt at post process was `PlayerCameraManager->ViewTarget.POV.PostProcessSettings`. Doesn't work. `POV` is a struct copy, not a reference. You're modifying a local copy that doesn't affect what the camera actually renders. Camera component approach is the right one.

## What I Learned

Coming from a month of UE C++ for game dev, a lot of this clicked faster than it would have otherwise. Knowing what `UCharacterMovementComponent` is, what `APawn` is, what the relationship between `PlayerController` and `Pawn` looks like - that context made navigating the SDK way less confusing.

The actual memory writing part is almost boring once you have the SDK. The hard part is understanding UE's object model well enough to find what you want. GObjects chain, component lookups, knowing that `POV` is a copy not a reference - that's what takes time.

If you're learning UE and want a project that forces you to actually understand the engine internals, this is a solid one.

Source: [github.com/michal-flaska/digging-hax](https://github.com/michal-flaska/digging-hax)
