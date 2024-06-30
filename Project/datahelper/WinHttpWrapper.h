// The MIT License (MIT)
// WinHTTP Wrapper 1.0.3
// Copyright (C) 2020 - 2022, by Wong Shao Voon (shaovoon@yahoo.com)
// Copyright (C) 2016 - 2024 CyberDay Studios
//
// http://opensource.org/licenses/MIT

// version 1.0.3: Set the text regardless the http status, not just for HTTP OK 200
// version 1.0.4: Add hGetHeaderDictionary() and contentLength to HttpResponse class

#pragma once

#include <string>

#define WIN32_LEAN_AND_MEAN
#include "pch.h"
#include <unordered_map>

extern "C" {
	namespace WinHttpWrapper
	{
		struct HttpResponse {
			EXPORT_API HttpResponse() : statusCode(0), contentLength(0) {}
			void EXPORT_API Reset() {
				text = "";
				header = L"";
				statusCode = 0;
				error = L"";
				dict.clear();
				contentLength = 0;
			}
			EXPORT_API std::unordered_map<std::wstring, std::wstring>& GetHeaderDictionary();

			std::string text;
			std::wstring header;
			DWORD statusCode;
			DWORD contentLength;
			std::wstring error;

		private:
			std::unordered_map<std::wstring, std::wstring> dict;
		};

		class HttpRequest {
		public:
			EXPORT_API HttpRequest(
				const std::wstring& domain,
				int port,
				bool secure,
				const std::wstring& user_agent = L"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 coc_coc_browser/129.0.0",
				const std::wstring& proxy_username = L"",
				const std::wstring& proxy_password = L"",
				const std::wstring& server_username = L"",
				const std::wstring& server_password = L""
			) : m_Domain(domain),
				m_Port(port),
				m_Secure(secure),
				m_UserAgent(user_agent),
				m_ProxyUsername(proxy_username),
				m_ProxyPassword(proxy_password),
				m_ServerUsername(server_username),
				m_ServerPassword(server_password)
			{ }

			bool EXPORT_API Get(const std::wstring& rest_of_path,
				const std::wstring& requestHeader,
				HttpResponse& response);
			bool EXPORT_API Post(const std::wstring& rest_of_path,
				const std::wstring& requestHeader,
				const std::string& body,
				HttpResponse& response);
			bool EXPORT_API Put(const std::wstring& rest_of_path,
				const std::wstring& requestHeader,
				const std::string& body,
				HttpResponse& response);
			bool EXPORT_API Delete(const std::wstring& rest_of_path,
				const std::wstring& requestHeader,
				const std::string& body,
				HttpResponse& response);
		private:
			// Request is wrapper around http()
			bool EXPORT_API Request(
				const std::wstring& verb,
				const std::wstring& rest_of_path,
				const std::wstring& requestHeader,
				const std::string& body,
				HttpResponse& response
			);

			static bool EXPORT_API http(
				const std::wstring& verb, const std::wstring& user_agent, const std::wstring& domain,
				const std::wstring& rest_of_path, int port, bool secure,
				const std::wstring& requestHeader, const std::string& body,
				std::string& text, std::wstring& responseHeader,
				DWORD& statusCode, DWORD& dwContent, std::wstring& error,
				const std::wstring& szProxyUsername, const std::wstring& szProxyPassword,
				const std::wstring& szServerUsername, const std::wstring& szServerPassword
			);

			static DWORD EXPORT_API ChooseAuthScheme(DWORD dwSupportedSchemes);

			std::wstring m_Domain;
			int m_Port;
			bool m_Secure;
			std::wstring m_UserAgent;
			std::wstring m_ProxyUsername;
			std::wstring m_ProxyPassword;
			std::wstring m_ServerUsername;
			std::wstring m_ServerPassword;
		};
	}
}