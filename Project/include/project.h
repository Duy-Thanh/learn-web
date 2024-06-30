#pragma once

#include <sqlite3.h>
#include <stdio.h>
#include <memory.h>
#include <string.h>
#include <stdlib.h>
#include <stdint.h>
#include <stddef.h>

// #define ADD_EXPORTS

#ifdef _WIN32
	#ifdef ADD_EXPORTS
		#define ADDAPI __declspec(dllexport)
	#else
		#define ADDAPI __declspec(dllimport)
	#endif

	// Define calling convention in one place, for convenience
	#define ADDCALL	__cdecl
#else
	// Define with no-value on non-Windows OSes
	#define ADDAPI
	#define ADDCALL
#endif

// Make sure functions are exported with C linkage under C++ compiler
#ifdef __cplusplus
extern "C" {
#endif

// Define our function and structure here!
ADDAPI int ADDCALL Add(int a, int b);

// SQL
typedef struct {
	sqlite3* DB;
} __attribute__((packed)) SQL_STRUCTURE, *PSQL_STRUCTURE;

PSQL_STRUCTURE sql_struct_ptr = NULL;

ADDAPI int ADDCALL init();
ADDAPI int ADDCALL close();

// Open Database
ADDAPI int ADDCALL SQL_OpenDB(const char* filename);

// Close Database
ADDAPI int ADDCALL SQL_CloseDB();

// Exec query database
ADDAPI int ADDCALL SQL_Exec(const char* query_str);

typedef int (*DataCallback)(void*, int, char **, char **);

ADDAPI int callback(void *data, int argc, char **argv, char **azColName, DataCallback callback);

// -----------------
// Base64
// -----------------

// Encode
ADDAPI size_t b64_encoded_size(size_t inlen);
ADDAPI char *b64_encode(const unsigned char *in, size_t len);

// Decode
ADDAPI size_t b64_decoded_size(const char *in);
ADDAPI void b64_generate_decode_table();
ADDAPI int b64_isvalidchar(char c);
ADDAPI int b64_decode(const char* in, unsigned char* out, size_t outlen);

// -----------------
// AES
// -----------------

// Macros for AES

// #define the macros below 1/0 to enable/disable the mode of operation
//
// CBC enables AES encryption in CBC-mode of operation
// CTR enables encryption in counter-mode
// ECB enables the basic ECB 16-byte block algorithm. All can be enabled simultaneously
//
#ifndef CBC
	#define CBC 1
#endif

#ifndef ECB
	#define ECB 1
#endif

#ifndef CTR
	#define CTR 1
#endif

// #define AES128 1
// #define AES192 1
#define AES256 1

#define AES_BLOCKLEN 16

#if defined(AES256) && (AES256 == 1)
	#define AES_KEYLEN 32
	#define AES_keyExpSize 240
#elif defined(AES192) && (AES192 == 1)
	#define AES_KEYLEN 24
	#define AES_keyExpSize 208
#else
	#define AES_KEYLEN 16
	#define AES_keyExpSize 176
#endif

typedef struct {
	uint8_t RoundKey[AES_keyExpSize];
#if (defined(CBC) && (CBC == 1)) || (defined(CTR) && (CTR == 1))
	uint8_t Iv[AES_BLOCKLEN];
#endif
} AES_ctx, *PAES_ctx __attribute__((packed));

ADDAPI void AES_init_ctx(struct AES_ctx* ctx, const uint8_t *key);

#if (defined(CBC) && (CBC == 1)) || (defined(CTR) && (CTR == 1))
	ADDAPI void AES_init_ctx_iv(struct AES_ctx *ctx, const uint8_t* key, const uint8_t* iv);
	ADDAPI void AES_ctx_set_iv(struct AES_ctx *ctx, const uint8_t* key);
#endif

#ifdef _cplusplus
} // __cplusplus defined
#endif
