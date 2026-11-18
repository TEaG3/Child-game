# Android release signing

The workflow always builds the installable debug APK. It also builds and publishes a signed release APK when all four GitHub Actions repository secrets are configured.

## One-time setup for a permanent signing key

Create the keystore on a trusted computer and keep a secure offline backup. Never commit the keystore or passwords to this repository.

```bash
keytool -genkeypair -v -keystore upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias little-muslim
```

Encode the keystore as one Base64 string:

- macOS/Linux: `base64 -i upload-keystore.jks | tr -d '\n' > upload-keystore.base64`
- PowerShell: `[Convert]::ToBase64String([IO.File]::ReadAllBytes("upload-keystore.jks")) | Set-Content -NoNewline upload-keystore.base64`

In GitHub, open **Settings → Secrets and variables → Actions → New repository secret** and add:

| Secret name | Value |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | Entire contents of `upload-keystore.base64` |
| `ANDROID_KEYSTORE_PASSWORD` | Keystore password |
| `ANDROID_KEY_ALIAS` | `little-muslim` (or the alias you chose) |
| `ANDROID_KEY_PASSWORD` | Key password |

After these secrets exist, the next Android workflow run will build and publish both the debug APK and the signed release APK. The same keystore must be retained for every future update so Android accepts upgrades over the installed release.

If the secrets are absent, the workflow intentionally skips release signing and publishes only the debug APK. Do not lose the keystore: a different signing key cannot update installations signed with the original key.
