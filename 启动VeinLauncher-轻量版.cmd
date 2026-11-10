@echo off
rem ===============================================================
rem  Vein Launcher Lite
rem  Keeps: download vanilla Minecraft, launch it, plugins page.
rem  ASCII only on purpose: cmd.exe reads .cmd in the OEM code page,
rem  non-ASCII comments get mis-parsed into bogus commands.
rem
rem  Python deps are shared with the workspace root (.deps next to
rem  this folder). Runtime data stays in .\VeinLauncher\.
rem ===============================================================
setlocal
cd /d "%~dp0"

set "VPY=C:\Users\CMAI\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe"
if not exist "%VPY%" set "VPY=python"

set "PYTHONPATH=%~dp0..\.deps;%~dp0"
set "PYTHONUTF8=1"
set "QTWEBENGINE_DISABLE_SANDBOX=1"

"%VPY%" -m vein_launcher.presentation.main %*
endlocal
