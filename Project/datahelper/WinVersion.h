#pragma once
#include "pch.h"

extern "C" {
	struct VersionInfo {
		VersionInfo() : Major(0), Minor(0), BuildNum(0) {}
		unsigned int Major;
		unsigned int Minor;
		unsigned int BuildNum;
	};

	class WinVersion {
	public:
		bool EXPORT_API GetVersion(VersionInfo& info);
		bool EXPORT_API IsBuildNumberGreaterOrEqual(unsigned int buildNumber);
	};
}