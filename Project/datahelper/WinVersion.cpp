#include "pch.h"

#pragma comment(lib, "ntdll")

extern "C" {
	NTSTATUS __stdcall RtlGetVersion(OSVERSIONINFOEXW* lpVersionInformation);

	bool EXPORT_API WinVersion::GetVersion(VersionInfo& info) {
		OSVERSIONINFOEXW osVersion;
		osVersion.dwOSVersionInfoSize = sizeof(OSVERSIONINFOEXW);

		if (RtlGetVersion(&osVersion) == 0) {
			info.Major = osVersion.dwMajorVersion;
			info.Minor = osVersion.dwMinorVersion;
			info.BuildNum = osVersion.dwBuildNumber;

			if (osVersion.dwBuildNumber >= 22000) {
				info.Major = 11;
			}

			return true;
		}

		return false;
	}
	bool EXPORT_API WinVersion::IsBuildNumberGreaterOrEqual(unsigned int buildNumber) {
		VersionInfo info;
		if (GetVersion(info)) {
			return (buildNumber >= info.BuildNum);
		}

		return false;
	}
}