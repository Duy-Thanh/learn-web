// dllmain.cpp : Defines the entry point for the DLL application.
#include "pch.h"

extern "C" {
	void EXPORT_API test_func_void(void) {
		// do something
	}

	int EXPORT_API test_func_int(void) {
		return 0x0;
	}
}
