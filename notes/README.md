# Notes

Working notes about running this site: decisions, the reasoning behind them,
and things worth remembering next time.

This directory sits outside `content/`, so nothing here is published to the
site. It is still a **public** repository.

## What belongs where

| Kind of thing                                      | Where                                                       |
| -------------------------------------------------- | ----------------------------------------------------------- |
| Decisions and the reasoning behind them            | here, in `notes/`                                           |
| Personal notes that should not be published at all | `content/private/` — gitignored and excluded from the build |
| Actual addresses, accounts, keys, passwords        | a password manager, never a file                            |

Keep real email addresses out of `notes/`. Writing down that alias X forwards to
mailbox Y publishes exactly the link an alias exists to hide.
