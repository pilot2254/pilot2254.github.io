---
title: "How GitHub Suspended My Account for 40 Days and Deleted My Repos"
date: "2025-12-22"
description: "The story of how GitHub's automated systems flagged my account, deleted my repositories, and took 40+ days to fix it."
---

On November 9th, 2024, I tried to log into GitHub. My account was gone. No email warning. No notification. Just suspended.

4 years of work. 2,000 contributions. All my school projects. Gone.

## Day 1: The Discovery

I only found out because I couldn't log in. GitHub didn't send me an email. The account just disappeared.

My username was `pilot2254`. I checked - the user ID returned a 404. It looked like they deleted me.

I panicked. I had no local backups of most projects. Everything was on GitHub. My entire portfolio, my school assignments, 4 years of work - all stored in one place like an idiot.

I submitted a support ticket (#3871213). My dad submitted another one. Then I waited.

## Days 1-11: The Void

GitHub support didn't respond. Just an automated confirmation email.

I tried everything:
- Tweeted at @GitHub
- DMed @github on Instagram (they saw it, then ghosted me)
- Posted on Reddit (mods auto-deleted it)
- Emailed from my school account (auto-declined)
- Bumped the ticket every day

Nothing worked. Nobody replied.

Meanwhile, I was watching the clock. I read that suspended accounts get deleted after 2 weeks. If that was true, I had days left before everything was permanently gone.

## Day 11: First Response

Finally, GitHub replied. Not with answers - just questions.

"Do you still need help? Please provide:
- Account username
- Location where you created it
- Original email address"

I had already provided all of this in the first ticket. But fine. I sent it again. I also mentioned that I had gotten approval from GitHub support before for educational repos (reverse engineering stuff).

Then more silence.

## Days 11-20: Community Attempts

A friend posted about my issue in GitHub Discussions. Most responses were AI-generated garbage or people suggesting things I'd already tried.

I got frustrated and snapped at someone. Then apologized. I was stressed.

I tried Reddit again. Mods locked the post immediately.

By day 20, still no real human response on the ticket.

## Day 27: The "Breakthrough"

On day 24, I bumped the ticket again. This time I emphasized that I'm a minor and my school projects were at risk.

On day 27, GitHub Trust & Safety finally responded.

Their explanation: "Suspicious login detected. Your account was compromised. A bad actor made changes."

They said my account was suspended for security reasons and asked me to review for unauthorized changes.

I checked the security log. All I saw were Copilot Chat App tokens being generated and regenerated from my IP address in Bratislava. Same location I always log in from.

No unauthorized commits. No strange activity. Just... Copilot tokens.

But fine. They reinstated my account.

## The Catch

My account was back, but broken.

- **800 contributions missing** (went from 2,000 to 1,200)
- **Pinned repository gone**
- **"Spammy" badge on my profile**
- **Profile returned 404 in incognito mode**
- **My organization (`michal-flaska`) returned 404**
- **All GitHub Pages sites broken**
- **Profile README not displaying**

I dug into the security log to see what this "bad actor" actually did.

Here's what I found:

1. Copilot tokens generated/regenerated (the "suspicious activity")
2. Account suspended by GitHub
3. **GitHub's automated system removed search tags and deleted repos AFTER the suspension**

The "bad actor" didn't delete anything. **GitHub's own automation did.**

Over 1,000 contributions worth of repositories - deleted by their system, not by any attacker.

## Days 28-40: Round Two

I reported all of this back to the ticket on November 24th. Explained that their automation deleted my repos. Showed the security log proof.

Then I waited again.

7 days. 13 days. 16 days. Nothing.

On December 7th, I tried opening a new ticket. It was blocked as a "duplicate."

I kept replying to the existing ticket. My friend prepared another GitHub discussion post. I considered going back to Twitter.

## Day 40+: Finally Fixed

After 40+ days total, my account was fully restored.

Profile public. Organization accessible. Functionality back. The "Spammy" badge removed.

Everything worked again.

No explanation. No apology. Just... fixed.

## What I Learned

**GitHub support is painfully slow.** 27 days for a real human response. 40+ days for full resolution. That's not an edge case - that's normal for them.

**Their automated systems will fuck you over.** The suspension triggered automatic repo deletions. No human reviewed this. No one asked if it was necessary. The system just nuked my work.

**Partial reinstatements are a nightmare.** Getting your account back "but broken" is worse than having it suspended. You can see your stuff, but you can't use it. And support won't prioritize fixing it because technically your account is "restored."

**Always have local backups.** This is obvious, but I didn't do it. Don't be like me. Clone everything locally. Use external drives. Don't trust any cloud service - not GitHub, not Google Drive, not anything.

**Persistence works.** I bumped tickets every few days. I tried multiple platforms. I mentioned I'm a minor with school work at risk. I documented everything. Eventually, someone noticed.

**Public pressure helps.** GitHub discussions, Twitter mentions, Reddit posts (when they don't get deleted) - these add visibility. GitHub ignores private tickets. They care more when it's public.

## The Numbers

- **40+ days** from suspension to full restoration
- **27 days** for first real human response
- **2 support tickets** (mine + my dad's)
- **~1,000 contributions** temporarily lost
- **Multiple repositories** deleted by GitHub's automated system
- **Zero emails** from GitHub throughout the entire process

According to GitHub's own transparency reports, only 85 appeals were successful out of 30,000+ suspended accounts. Most people never get their accounts back.

I got lucky. But I also didn't give up.

## If This Happens to You

1. **Submit a ticket immediately.** Include everything: username, email, location, why you think you were suspended.
2. **Have someone else submit a ticket too.** My dad's ticket probably helped create pressure.
3. **Bump the ticket every 3-5 days.** Don't spam, but don't let them forget you.
4. **Post in GitHub Discussions.** Even if you get AI slop responses, it adds visibility.
5. **Try Twitter/X.** Tag @GitHubSupport. Sometimes public posts get faster responses.
6. **Document everything.** Security logs, dates, responses. You'll need this.
7. **Mention if you're a student.** If your school projects are at risk, say so. They care more about students.
8. **Don't give up.** Weeks of silence is normal. Keep pushing.

And most importantly: **Back up your shit locally.** Right now. Before you need it.

## Final Thoughts

GitHub is the standard for developers. Everyone uses it. But their support is garbage, their automation is reckless, and their communication is nonexistent.

I got my account back after 40 days. Most people don't. I was persistent, I had help, and I got lucky.

Don't rely on luck. Back up your work. Diversify where you store things. And if this happens to you, don't give up.

Because GitHub support sure as hell won't help you quickly.
