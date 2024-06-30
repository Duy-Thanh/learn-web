#include "pch.h"
#include "WinHttpWrapper.h"
#include "WinVersion.h"
#include <winhttp.h>

#pragma comment(lib, "Winhttp.lib")

extern "C" {
	DWORD EXPORT_API WinHttpWrapper::HttpRequest::ChooseAuthScheme(DWORD dwSupportedSchemes) {
		if (dwSupportedSchemes & WINHTTP_AUTH_SCHEME_NEGOTIATE) {
			return WINHTTP_AUTH_SCHEME_NEGOTIATE;
		}
		else if (dwSupportedSchemes & WINHTTP_AUTH_SCHEME_NTLM) {
			return WINHTTP_AUTH_SCHEME_NTLM;
		}
		else if (dwSupportedSchemes & WINHTTP_AUTH_SCHEME_PASSPORT) {
			return WINHTTP_AUTH_SCHEME_PASSPORT;
		}
		else if (dwSupportedSchemes & WINHTTP_AUTH_SCHEME_DIGEST) {
			return WINHTTP_AUTH_SCHEME_DIGEST;
		}
		else if (dwSupportedSchemes & WINHTTP_AUTH_SCHEME_BASIC) {
			return WINHTTP_AUTH_SCHEME_BASIC;
		}
		else {
			return 0;
		}
	}
	bool EXPORT_API WinHttpWrapper::HttpRequest::http(
		const std::wstring& verb, const std::wstring& user_agent, const std::wstring& domain,
		const std::wstring& rest_of_path, int port, bool secure,
		const std::wstring& requestHeader, const std::string& body,
		std::string& text, std::wstring& responseHeader,
		DWORD& statusCode, DWORD& dwContent, std::wstring& error,
		const std::wstring& szProxyUsername, const std::wstring& szProxyPassword,
		const std::wstring& szServerUsername, const std::wstring& szServerPassword
	) {
		DWORD dwSupportedSchemes;
		return true;
	}
	bool EXPORT_API WinHttpWrapper::HttpRequest::Request(
		const std::wstring& verb,
		const std::wstring& rest_of_path,
		const std::wstring& requestHeader,
		const std::string& body,
		HttpResponse& response
	) {
		return http(
			verb, m_UserAgent, m_Domain,
			rest_of_path, m_Port, m_Secure,
			requestHeader, body,
			response.text, response.header,
			response.statusCode,
			response.contentLength,
			response.error,
			m_ProxyUsername, m_ProxyPassword,
			m_ServerUsername, m_ServerPassword
		);
	}

	bool EXPORT_API WinHttpWrapper::HttpRequest::Get(
		const std::wstring& rest_of_path,
		const std::wstring& requestHeader,
		HttpResponse& response
	) {
		static const std::wstring verb = L"GET";
		static std::string body;

		return Request(
			verb,
			rest_of_path,
			requestHeader,
			body,
			response
		);
	}

	bool EXPORT_API WinHttpWrapper::HttpRequest::Post(const std::wstring& rest_of_path,
		const std::wstring& requestHeader,
		const std::string& body,
		HttpResponse& response) {
		static const std::wstring verb = L"POST";

		return Request(
			verb,
			rest_of_path,
			requestHeader,
			body,
			response
		);
	}
}