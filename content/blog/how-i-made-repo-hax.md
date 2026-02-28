---
title: "How I made a cheat for R.E.P.O in an afternoon"
date: "2026-02-28"
description: "130 hours on REPO, a friend who wanted to play, and a weekend with nothing better to do. Here's how I built repo-hax."
related: ["how-to-start-game-hacking", "how-to-start-reverse-engineering"]
---

So I was playing REPO with my friend today, idk why would I even do that after more than half a year of not touching it, but anyway. When she stopped playing and went to bed or whatever, I started working on a cheat for REPO that I wanted to do for a long time.

It wasn't really hard. Why? Because people in Unity are not really smart let's say, and decided to use .NET, which straight up gives you the full source code even after build. Like bro, just use IL2CPP...

## What even is REPO

For those uneducated people, it's a co-op horror game where you collect valuables and bring them to extraction without dying. Pretty fun with friends. I have 130 hours on it which is not healthy but whatever.

## Tools

- [dnSpyEx](https://github.com/dnspyex/dnSpy) - to read the game's C# code (use the Ex fork, original is dead)
- [SharpMonoInjector](https://github.com/warbler/SharpMonoInjector) - to inject the compiled DLL into the running game
- Visual Studio - to write and build the cheat (how unexpected)

If you don't know the difference between Mono and IL2CPP Unity builds, go read my [game hacking guide](/blog/how-to-start-game-hacking) first, or some Unity docs.

## Reading the game code

Open `Assembly-CSharp.dll` from `REPO_Data/Managed/` in dnSpyEx. The entire game is just... there. Readable C#. Classes, methods, field names, everything.

I looked around `PlayerController`, `PlayerHealth`, `PlayerAvatar` and `StatsManager` for maybe 20 minutes and found everything I needed. The funniest thing I found was this:

```
PlayerController.DebugNoTumble - public bool
PlayerController.DebugEnergy   - public bool
```

The devs left debug flags in the shipping build. `DebugNoTumble` blocks the ragdoll system. `DebugEnergy` disables stamina drain. They literally did the work for me, I just had to find it and set it to true. Goofy ahh devs.

## Finding fields and methods in dnSpyEx

This is the part nobody explains well. When you find a field you want to use from your cheat, you need two things: the field name and whether it's public or private.

Click any field or method in dnSpyEx and the status bar at the bottom shows you the token (like `0x04002377`). You don't actually use the token in code, it's just a unique ID. What matters is the access modifier in the decompiled code.

If it's `public`, access it directly:
```csharp
pc.DebugNoTumble = true; // public, no reflection needed
```

If it's `private` or `internal`, you need reflection:
```csharp
// get the FieldInfo once at class level and cache it
private static readonly FieldInfo _healthField = typeof(PlayerHealth)
    .GetField("health", BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);

// then use it wherever
_healthField?.SetValue(ph, 100);
```

`BindingFlags.NonPublic | BindingFlags.Public` covers both cases so you don't have to guess. The `?.` null check is there because if you typo the field name, `GetField` returns null instead of crashing immediately (easier to debug)

For methods it's the same idea but with `GetMethod` and `Invoke`. Didn't need that here since almost everything I used was public.

## Project setup

Create a Class Library project in Visual Studio, target .NET 4.8, and reference these from `REPO_Data/Managed/`:
- `Assembly-CSharp.dll`
- `UnityEngine.dll` + modules you need (CoreModule, IMGUIModule, InputLegacyModule, etc.)

Now you can use Unity and game types directly in your code like you're writing a mod for BepInEx.

## Entry point

Unity Mono cheats work by injecting a DLL that adds a `MonoBehaviour` to a persistent `GameObject`. SharpMonoInjector calls `Loader.Load()` on injection:

```csharp
public class Loader
{
    private static GameObject _cheatObject;

    public static void Load()
    {
        _cheatObject = new GameObject("REPOCheat");
        _cheatObject.AddComponent<CheatBehaviour>();
        UnityEngine.Object.DontDestroyOnLoad(_cheatObject);
    }

    public static void Unload()
    {
        UnityEngine.Object.Destroy(_cheatObject);
    }
}
```

`DontDestroyOnLoad` is important, without it your cheat dies on scene transitions.

From here `CheatBehaviour` is just a normal MonoBehaviour. `Update()` runs every frame, `OnGUI()` handles the menu. Unity already has a built-in UI system (legacy IMGUI) so you don't even need ImGui. It looks like ass but it works.

## God mode, no ragdoll, infinite stamina

These are the ones I'm most happy with. Simple, clean, work perfectly.

God mode runs every frame. `InvincibleSet` takes a duration in seconds so calling it with 9999 every frame keeps it permanent. `health` is a private field so I need reflection to set it:

```csharp
private static readonly FieldInfo _healthField = typeof(PlayerHealth)
    .GetField("health", BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);

// runs in Update()
ph.InvincibleSet(9999f);
_healthField?.SetValue(ph, 100);
```

I cache the `FieldInfo` once at class level instead of calling `GetField` every frame, that would be wasteful.

No ragdoll and infinite stamina are literally one line each because the devs left those debug flags in:

```csharp
pc.DebugNoTumble = _noRagdoll;     // blocks ragdoll on damage/enemy hits
pc.DebugEnergy = _infiniteStamina; // skips sprint drain timer
if (_infiniteStamina)
    pc.EnergyCurrent = pc.EnergyStart;
```

Side note: `DebugNoTumble` only blocks involuntary ragdoll. If you press the tumble key yourself it still works because voluntary tumble passes a different internal flag. Nice side effect.

## Speed hack

The game has a built-in `OverrideSpeed` on `PlayerController`. You pass a multiplier and a duration, call it every frame to keep it active:

```csharp
if (_speedHack)
    pc.OverrideSpeed(_speedMultiplier, 0.5f);
else
    pc.OverrideSpeed(1f, 0.1f);
```

Multiplier goes 1x to 5x. Above 5x it gets stupid fast. The menu has a slider.

## Upgrades

REPO's upgrade system is stored as dictionaries in `StatsManager` keyed by Steam ID. There's already a method to update them directly, so:

```csharp
private void SetUpgrade(string dictName)
{
    string steamID = _steamIDField?.GetValue(PlayerAvatar.instance) as string;
    if (string.IsNullOrEmpty(steamID)) return;

    // DictionaryUpdateValue updates the in-memory dict
    StatsManager.instance.DictionaryUpdateValue(dictName, steamID, _upgradeValue);
}
```

One thing that got me: speed and stamina upgrades only apply at level load in `LateStart()`, so changing them mid-run does nothing for that run. That's why the speed multiplier is a separate feature that works immediately.

## Troll menu

REPO's chat parses TMP rich text tags, and `ChatManager` has a `ForceSendMessage` method. So you can send some funny shit:

```csharp
private void SendChat(string message)
{
    if (ChatManager.instance == null) return;
    ChatManager.instance.ForceSendMessage(message);
}

// flashbang - size=-111111 causes a screen flash
SendChat("<size=-111111>hi");

// massive text on everyone's screen
SendChat("<size=999>HELLO");

// invisible message
SendChat("<alpha=#00>ghost message");
```

Multiplayer only though. `ChatManager.Update()` returns early in singleplayer so none of this works solo.

## ESP (the one I gave up on)

This is the embarrassing part. The ESP draws player names, HP and distance through walls. Except it draws wrong. The further away a player is, the more the label drifts left of where they actually are.

I tried multiple world-to-screen approaches, different cameras, everything:

```csharp
private Camera GetGameCamera()
{
    var pc = PlayerController.instance;
    if (pc != null && pc.cameraGameObjectLocal != null)
    {
        var cam = pc.cameraGameObjectLocal.GetComponentInChildren<Camera>();
        if (cam != null) return cam;
        cam = pc.cameraGameObject.GetComponentInChildren<Camera>();
        if (cam != null) return cam;
    }
    // last resort
    foreach (var cam in Camera.allCameras)
    {
        if (cam.enabled && !cam.orthographic && cam.gameObject.activeInHierarchy)
            return cam;
    }
    return Camera.main;
}

private bool WorldToScreen(Camera cam, Vector3 worldPos, out Vector2 screenPos)
{
    screenPos = Vector2.zero;
    Vector3 vp = cam.WorldToViewportPoint(worldPos);
    if (vp.z < 0) return false;
    screenPos = new Vector2(vp.x * Screen.width, (1f - vp.y) * Screen.height);
    return true;
}
```

Nothing worked. Still drifts left at distance. I even left a debug label in showing which camera is being used to rule out wrong camera issues. The math looks correct but the output isn't, and I have no idea why.

![nga esp not working](/images/blog/how-i-made-repo-hax/esp-bug.png)

Gave up on it. ESP in a friend lobby cheat is kinda useless anyway.

If you know what's wrong, let me know on discord, or just create a PR/issue on github.

## Building and injecting

1. Build as Release, .NET 4.8, Class Library
2. References point to `REPO_Data/Managed/`
3. Launch game, load into a level (not main menu, player instances won't exist yet)
4. Inject:

```
smi.exe inject -p REPO -a "path\to\cheat.dll" -n cheat -c Loader -m Load
```

5. Press Insert in-game

## Why this is easier than C++ cheats

No offsets. No pattern scanning. No `ReadProcessMemory`. You just use the game's own classes because the entire codebase is sitting in a DLL waiting for you to read it.

The tradeoff is it's more detectable and only works on Mono builds, but for messing around in a friend lobby that doesn't matter.

---

## Source code

This is what the source code looked like while I was writing this blog. It will probably be updated on github soon, so don't take this as the final version:

```cpp
using System;
using System.Reflection;
using UnityEngine;

// this file looks like absolute mess
// i will update this later
// just too lazy to do it rn

namespace cheat
{
    public class Loader
    {
        private static GameObject _cheatObject;

        public static void Load()
        {
            _cheatObject = new GameObject("REPOCheat");
            _cheatObject.AddComponent<CheatBehaviour>();
            UnityEngine.Object.DontDestroyOnLoad(_cheatObject);
        }

        public static void Unload()
        {
            UnityEngine.Object.Destroy(_cheatObject);
        }
    }

    public class CheatBehaviour : MonoBehaviour
    {
        private bool _menuOpen = false;
        private bool _godMode = false;
        private bool _speedHack = false;
        private float _speedMultiplier = 1f;
        private bool _noRagdoll = false;
        private bool _noBreak = false;
        private bool _esp = false;
        private bool _infiniteStamina = false;

        private bool _showUpgrades = false;
        private bool _showTrolls = false;
        private int _upgradeValue = 10;

        // dnspy shit notes

        // PlayerHealth.health        - Token: 0x04002377, internal int, default 100
        // PlayerAvatar.isLocal       - Token: 0x040020B1, internal bool
        // PlayerAvatar.instance      - Token: 0x040020E4, public static
        // PlayerAvatar.playerHealth  - Token: 0x0400209E, public PlayerHealth
        // PlayerAvatar.steamID       - Token: 0x040020AC, internal string
        // PlayerAvatar.playerName    - Token: 0x040020AB, internal string
        // PlayerController.instance  - Token: 0x040021EE, public static
        // PlayerController.cameraGameObject - Token: 0x04002232, public GameObject (actual render camera)
        // PlayerController.DebugNoTumble - Token: 0x04002228, public bool
        //   TumbleRequest checks this - if true and _playerInput is false, ragdoll is blocked
        // PlayerController.DebugEnergy - Token: 0x0400222A, public bool
        //   if true, SprintDrainTimer never drains EnergyCurrent and slide costs 0
        // PlayerController.EnergyCurrent - Token: 0x0400222C, public float
        // PlayerController.EnergyStart   - Token: 0x0400222B, public float, default 100
        // PlayerController.OverrideSpeed(float _speedMulti, float _time) - Token: 0x06001572
        //   internally multiplies playerOriginalMoveSpeed/SprintSpeed/CrouchSpeed
        //   playerOriginalMoveSpeed   - Token: 0x04002261, private float, set in LateStart() after upgrades
        //   playerOriginalSprintSpeed - Token: 0x04002263, internal float, set in LateStart() after upgrades
        //   playerOriginalCrouchSpeed - Token: 0x04002264, private float, set in LateStart() after upgrades
        // StatsManager.instance      - Token: 0x04001CB3, public static
        // StatsManager.DictionaryUpdateValue(string dictName, string steamID, int value) - Token: 0x06001292
        // upgrade dicts (all public Dictionary<string,int>, keyed by steamID):
        //   playerUpgradeHealth     - Token: 0x04001CBF  (each point = +20 max hp)
        //   playerUpgradeStamina    - Token: 0x04001CC0
        //   playerUpgradeSpeed      - Token: 0x04001CC8  (adds directly to SprintSpeed in LateStart)
        //   playerUpgradeStrength   - Token: 0x04001CC9
        //   playerUpgradeExtraJump  - Token: 0x04001CC1
        //   playerUpgradeRange      - Token: 0x04001CCB
        //   playerUpgradeThrow      - Token: 0x04001CCA
        // PhysGrabObject.isValuable  - Token: 0x04001F0B, internal bool
        // PhysGrabObject.OverrideIndestructible(float time) - Token: 0x060013DD
        // ExtractionPoint.safetySpawn - public Transform
        //   isLocked - public bool
        // ChatManager.instance       - Token: 0x040024CC, public static
        // ChatManager.ForceSendMessage(string _message) - Token: 0x06001681, public
        //   sets chatMessage then calls ForceConfirmChat() -> StateSet(Send)
        //   only works in multiplayer - Update() returns early in singleplayer
        // chat tricks (TMP rich text parsed by the game):
        //   flashbang: <size=-111111>text   - sets text size to near-zero causing screen flash
        //   big text:  <size=999>text       - massive text on everyone's screen
        //   invisible: <alpha=#00>text      - sends invisible message
        //   rainbow:   <gradient>text       - colored gradient text
        private static readonly FieldInfo _healthField = typeof(PlayerHealth)
            .GetField("health", BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);

        private static readonly FieldInfo _steamIDField = typeof(PlayerAvatar)
            .GetField("steamID", BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);

        private static readonly FieldInfo _isValuableField = typeof(PhysGrabObject)
            .GetField("isValuable", BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);

        private static readonly FieldInfo _playerNameField = typeof(PlayerAvatar)
            .GetField("playerName", BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);

        private static readonly FieldInfo _isLocalField = typeof(PlayerAvatar)
            .GetField("isLocal", BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);

        private GUIStyle _espStyle;

        void Update()
        {
            if (UnityEngine.Input.GetKeyDown(KeyCode.Insert))
                _menuOpen = !_menuOpen;

            var pc = PlayerController.instance;
            var ph = PlayerAvatar.instance?.playerHealth;

            if (_godMode && ph != null)
            {
                // PlayerHealth.InvincibleSet(float _time) - Token: 0x060015D6
                ph.InvincibleSet(9999f);
                _healthField?.SetValue(ph, 100);
            }

            if (pc != null)
            {
                if (_speedHack)
                    pc.OverrideSpeed(_speedMultiplier, 0.5f);
                else
                    pc.OverrideSpeed(1f, 0.1f);

                // PlayerController.DebugNoTumble blocks TumbleRequest when _playerInput is false
                // player-triggered tumble (key press) still works since it passes _playerInput = true
                pc.DebugNoTumble = _noRagdoll;

                // DebugEnergy skips SprintDrainTimer drain and slide energy cost
                pc.DebugEnergy = _infiniteStamina;
                if (_infiniteStamina)
                    pc.EnergyCurrent = pc.EnergyStart;
            }

            if (_noBreak)
            {
                foreach (var obj in UnityEngine.Object.FindObjectsOfType<PhysGrabObject>())
                {
                    if ((bool)(_isValuableField?.GetValue(obj) ?? false))
                        obj.OverrideIndestructible(0.5f);
                }
            }
        }

        void OnGUI()
        {
            if (_espStyle == null)
            {
                _espStyle = new GUIStyle(UnityEngine.GUI.skin.label);
                _espStyle.normal.textColor = Color.green;
                _espStyle.fontStyle = FontStyle.Bold;
                _espStyle.fontSize = 14;
                _espStyle.alignment = TextAnchor.MiddleCenter; // should fix the esp draw bug
            }

            if (_esp)
                DrawESP();

            if (!_menuOpen) return;

            if (!_showUpgrades && !_showTrolls)
                DrawMainMenu();
            else if (_showUpgrades)
                DrawUpgradesMenu();
            else if (_showTrolls)
                DrawTrollMenu();
        }

        /*
        private Camera GetGameCamera()
        {
            var pc = PlayerController.instance;
            if (pc != null)
            {
                // try local camera first (first-person render camera)
                if (pc.cameraGameObjectLocal != null)
                {
                    var cam = pc.cameraGameObjectLocal.GetComponentInChildren<Camera>();
                    if (cam != null) return cam;
                }
                // fallback to main camera object
                if (pc.cameraGameObject != null)
                {
                    var cam = pc.cameraGameObject.GetComponentInChildren<Camera>();
                    if (cam != null) return cam;
                }
            }
            return Camera.main;
        }
        */

        private Camera GetGameCamera()
        {
            var pc = PlayerController.instance;
            if (pc != null && pc.cameraGameObjectLocal != null)
            {
                var cam = pc.cameraGameObjectLocal.GetComponentInChildren<Camera>();
                if (cam != null) return cam;
                cam = pc.cameraGameObject.GetComponentInChildren<Camera>();
                if (cam != null) return cam;
            }
            // last resort - find any non-orthographic enabled camera
            foreach (var cam in Camera.allCameras)
            {
                if (cam.enabled && !cam.orthographic && cam.gameObject.activeInHierarchy)
                    return cam;
            }
            return Camera.main;
        }

        private bool WorldToScreen(Camera cam, Vector3 worldPos, out Vector2 screenPos)
        {
            screenPos = Vector2.zero;
            Vector3 vp = cam.WorldToViewportPoint(worldPos);
            if (vp.z < 0) return false;
            // viewport is 0-1, convert to screen pixels
            screenPos = new Vector2(vp.x * Screen.width, (1f - vp.y) * Screen.height);
            return true;
        }

        private void DrawESP()
        {
            var cam = GetGameCamera();
            if (cam == null) return;

            UnityEngine.GUI.Label(new Rect(20, Screen.height - 40, 400, 20), $"CAM: {cam?.name ?? "null"} pos:{cam?.transform.position}");      

            foreach (var avatar in UnityEngine.Object.FindObjectsOfType<PlayerAvatar>())
            {
                bool isLocal = (bool)(_isLocalField?.GetValue(avatar) ?? false);
                if (isLocal) continue;

                Vector3 worldPos = avatar.transform.position + Vector3.up * 1.0f;
                Vector3 screenPos = cam.WorldToScreenPoint(worldPos);
                if (screenPos.z < 0) continue;

                float sx = screenPos.x;
                float sy = Screen.height - screenPos.y;

                string name = _playerNameField?.GetValue(avatar) as string ?? "Player";
                int hp = avatar.playerHealth != null ? (int)(_healthField?.GetValue(avatar.playerHealth) ?? 0) : 0;
                float distance = Vector3.Distance(
                    PlayerAvatar.instance?.transform.position ?? Vector3.zero,
                    avatar.transform.position
                );

                float w = 120f;
                float h = 60f;

                if (!WorldToScreen(cam, avatar.transform.position + Vector3.up * 1.0f, out Vector2 sp)) continue;
                UnityEngine.GUI.Label(new Rect(sp.x - 60f, sp.y - 30f, 120f, 60f), $"{name}\nHP: {hp}\n{distance:F0}m", _espStyle);
            }
        }

        private void DrawMainMenu()
        {
            UnityEngine.GUI.Box(new Rect(20, 20, 220, 310), "REPO Cheat");

            _godMode = UnityEngine.GUI.Toggle(new Rect(30, 50, 180, 25), _godMode, "God Mode");
            _speedHack = UnityEngine.GUI.Toggle(new Rect(30, 80, 180, 25), _speedHack, "Speed Multiplier");
            _noRagdoll = UnityEngine.GUI.Toggle(new Rect(30, 110, 180, 25), _noRagdoll, "No Ragdoll");
            _noBreak = UnityEngine.GUI.Toggle(new Rect(30, 140, 180, 25), _noBreak, "No Break");
            _esp = UnityEngine.GUI.Toggle(new Rect(30, 170, 180, 25), _esp, "Player ESP");
            _infiniteStamina = UnityEngine.GUI.Toggle(new Rect(30, 200, 180, 25), _infiniteStamina, "Infinite Stamina");

            if (_speedHack)
            {
                _speedMultiplier = UnityEngine.GUI.HorizontalSlider(new Rect(30, 228, 160, 20), _speedMultiplier, 1f, 5f);
                UnityEngine.GUI.Label(new Rect(30, 243, 180, 20), $"x{_speedMultiplier:F1} speed");
            }

            if (UnityEngine.GUI.Button(new Rect(30, 268, 85, 28), "Upgrades"))
                _showUpgrades = true;

            if (UnityEngine.GUI.Button(new Rect(125, 268, 85, 28), "TP Extract"))
                TeleportToExtraction();

            if (UnityEngine.GUI.Button(new Rect(30, 300, 180, 25), "Troll Chat"))
                _showTrolls = true;
        }

        private void DrawUpgradesMenu()
        {
            UnityEngine.GUI.Box(new Rect(20, 20, 220, 320), "Upgrades");

            UnityEngine.GUI.Label(new Rect(30, 50, 80, 20), "Set value:");
            if (UnityEngine.GUI.Button(new Rect(110, 48, 30, 22), "0")) _upgradeValue = 0;
            if (UnityEngine.GUI.Button(new Rect(145, 48, 30, 22), "10")) _upgradeValue = 10;
            if (UnityEngine.GUI.Button(new Rect(180, 48, 30, 22), "50")) _upgradeValue = 50;

            UnityEngine.GUI.Label(new Rect(30, 75, 180, 20), $"Current: {_upgradeValue}");

            int btnY = 100;
            int btnH = 28;
            int gap = 33;

            if (UnityEngine.GUI.Button(new Rect(30, btnY, 180, btnH), "Health")) SetUpgrade("playerUpgradeHealth");
            if (UnityEngine.GUI.Button(new Rect(30, btnY + gap, 180, btnH), "Stamina")) SetUpgrade("playerUpgradeStamina");
            if (UnityEngine.GUI.Button(new Rect(30, btnY + gap * 2, 180, btnH), "Speed")) SetUpgrade("playerUpgradeSpeed");
            if (UnityEngine.GUI.Button(new Rect(30, btnY + gap * 3, 180, btnH), "Strength")) SetUpgrade("playerUpgradeStrength");
            if (UnityEngine.GUI.Button(new Rect(30, btnY + gap * 4, 180, btnH), "Jump")) SetUpgrade("playerUpgradeExtraJump");
            if (UnityEngine.GUI.Button(new Rect(30, btnY + gap * 5, 180, btnH), "Range")) SetUpgrade("playerUpgradeRange");

            if (UnityEngine.GUI.Button(new Rect(30, 290, 180, 25), "Back"))
                _showUpgrades = false;
        }

        private void DrawTrollMenu()
        {
            UnityEngine.GUI.Box(new Rect(20, 20, 220, 280), "Troll Chat");
            UnityEngine.GUI.Label(new Rect(30, 48, 180, 20), "multiplayer only");

            int btnY = 70;
            int btnH = 28;
            int gap = 33;

            if (UnityEngine.GUI.Button(new Rect(30, btnY, 180, btnH), "Flashbang")) SendChat("<size=-111111>hi");
            if (UnityEngine.GUI.Button(new Rect(30, btnY + gap, 180, btnH), "Big Text")) SendChat("<size=999>HELLO");
            if (UnityEngine.GUI.Button(new Rect(30, btnY + gap * 2, 180, btnH), "Invisible")) SendChat("<alpha=#00>ghost message");
            if (UnityEngine.GUI.Button(new Rect(30, btnY + gap * 3, 180, btnH), "Spam Hello")) StartCoroutine(SpamChat("hello", 3));
            if (UnityEngine.GUI.Button(new Rect(30, btnY + gap * 4, 180, btnH), "Max Chaos")) SendChat("<size=-111111><size=999>CHAOS");
            if (UnityEngine.GUI.Button(new Rect(30, btnY + gap * 5, 180, btnH), "Custom...")) SendChat("<size=-111111>custom troll");

            if (UnityEngine.GUI.Button(new Rect(30, 248, 180, 25), "Back"))
                _showTrolls = false;
        }

        private void SendChat(string message)
        {
            if (ChatManager.instance == null) return;
            ChatManager.instance.ForceSendMessage(message);
        }

        private System.Collections.IEnumerator SpamChat(string message, int times)
        {
            for (int i = 0; i < times; i++)
            {
                SendChat(message);
                yield return new WaitForSeconds(1.1f);
            }
        }

        private void TeleportToExtraction()
        {
            var pc = PlayerController.instance;
            if (pc == null) return;

            // find first unlocked extraction point and teleport to its safetySpawn
            foreach (var ep in UnityEngine.Object.FindObjectsOfType<ExtractionPoint>())
            {
                if (ep.isLocked) continue;

                // fallback to extraction point itself if no safetySpawn
                pc.transform.position = ep.safetySpawn != null
                    ? ep.safetySpawn.position
                    : ep.transform.position + Vector3.up;
                return;
            }
        }

        private void SetUpgrade(string dictName)
        {
            string steamID = _steamIDField?.GetValue(PlayerAvatar.instance) as string;
            if (string.IsNullOrEmpty(steamID)) return;

            // StatsManager.DictionaryUpdateValue updates the in-memory dict
            // note: speed/stamina upgrades apply at LateStart() on level load,
            // so they wont affect the current run - use speed multiplier instead
            StatsManager.instance.DictionaryUpdateValue(dictName, steamID, _upgradeValue);
        }
    }
}
```

Updated source is [on GitHub](https://github.com/michal-flaska/repo-hax). Don't resell it, it's free.
