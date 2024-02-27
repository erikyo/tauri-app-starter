-- Create supertokens database
CREATE DATABASE IF NOT EXISTS supertokens;

CREATE TABLE `apps` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `created_at_time` bigint unsigned NOT NULL,
  PRIMARY KEY (`app_id`)
);

CREATE TABLE `tenants` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `tenant_id` varchar(64) NOT NULL DEFAULT 'public',
  `created_at_time` bigint unsigned NOT NULL,
  PRIMARY KEY (`app_id`,`tenant_id`),
  FOREIGN KEY (`app_id`) REFERENCES `apps` (`app_id`) ON DELETE CASCADE
);

CREATE TABLE `tenant_configs` (
  `connection_uri_domain` varchar(256) NOT NULL DEFAULT '',
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `tenant_id` varchar(64) NOT NULL DEFAULT 'public',
  `core_config` text,
  `email_password_enabled` tinyint(1) DEFAULT NULL,
  `passwordless_enabled` tinyint(1) DEFAULT NULL,
  `third_party_enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`connection_uri_domain`,`app_id`,`tenant_id`)
);

CREATE TABLE `tenant_thirdparty_providers` (
  `connection_uri_domain` varchar(256) NOT NULL DEFAULT '',
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `tenant_id` varchar(64) NOT NULL DEFAULT 'public',
  `third_party_id` varchar(28) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `authorization_endpoint` text,
  `authorization_endpoint_query_params` text,
  `token_endpoint` text,
  `token_endpoint_body_params` text,
  `user_info_endpoint` text,
  `user_info_endpoint_query_params` text,
  `user_info_endpoint_headers` text,
  `jwks_uri` text,
  `oidc_discovery_endpoint` text,
  `require_email` tinyint(1) DEFAULT NULL,
  `user_info_map_from_id_token_payload_user_id` varchar(64) DEFAULT NULL,
  `user_info_map_from_id_token_payload_email` varchar(64) DEFAULT NULL,
  `user_info_map_from_id_token_payload_email_verified` varchar(64) DEFAULT NULL,
  `user_info_map_from_user_info_endpoint_user_id` varchar(64) DEFAULT NULL,
  `user_info_map_from_user_info_endpoint_email` varchar(64) DEFAULT NULL,
  `user_info_map_from_user_info_endpoint_email_verified` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`connection_uri_domain`,`app_id`,`tenant_id`,`third_party_id`),
  FOREIGN KEY (`connection_uri_domain`, `app_id`, `tenant_id`) REFERENCES `tenant_configs` (`connection_uri_domain`, `app_id`, `tenant_id`) ON DELETE CASCADE
);

CREATE TABLE `tenant_thirdparty_provider_clients` (
  `connection_uri_domain` varchar(256) NOT NULL DEFAULT '',
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `tenant_id` varchar(64) NOT NULL DEFAULT 'public',
  `third_party_id` varchar(28) NOT NULL,
  `client_type` varchar(64) NOT NULL DEFAULT '',
  `client_id` varchar(256) NOT NULL,
  `client_secret` text,
  `scope` text,
  `force_pkce` tinyint(1) DEFAULT NULL,
  `additional_config` text,
  PRIMARY KEY (`connection_uri_domain`,`app_id`,`tenant_id`,`third_party_id`,`client_type`),
  FOREIGN KEY (`connection_uri_domain`, `app_id`, `tenant_id`, `third_party_id`) REFERENCES `tenant_thirdparty_providers` (`connection_uri_domain`, `app_id`, `tenant_id`, `third_party_id`) ON DELETE CASCADE
);

CREATE TABLE `key_value` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `tenant_id` varchar(64) NOT NULL DEFAULT 'public',
  `name` varchar(128) NOT NULL,
  `value` text,
  `created_at_time` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`app_id`,`tenant_id`,`name`),
  FOREIGN KEY (`app_id`, `tenant_id`) REFERENCES `tenants` (`app_id`, `tenant_id`) ON DELETE CASCADE
);

CREATE TABLE `app_id_to_user_id` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `user_id` char(36) NOT NULL,
  `recipe_id` varchar(128) NOT NULL,
  `primary_or_recipe_user_id` char(36) NOT NULL,
  `is_linked_or_is_a_primary_user` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`app_id`,`user_id`),
  FOREIGN KEY (`app_id`) REFERENCES `apps` (`app_id`) ON DELETE CASCADE,
  FOREIGN KEY (`app_id`, `primary_or_recipe_user_id`) REFERENCES `app_id_to_user_id` (`app_id`, `user_id`) ON DELETE CASCADE
);

CREATE TABLE `all_auth_recipe_users` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `tenant_id` varchar(64) NOT NULL DEFAULT 'public',
  `user_id` char(36) NOT NULL,
  `primary_or_recipe_user_id` char(36) NOT NULL,
  `is_linked_or_is_a_primary_user` BOOLEAN NOT NULL DEFAULT FALSE,
  `recipe_id` varchar(128) NOT NULL,
  `time_joined` bigint unsigned NOT NULL,
  `primary_or_recipe_user_time_joined` bigint unsigned NOT NULL,
  PRIMARY KEY (`app_id`,`tenant_id`,`user_id`),
  KEY `app_id` (`app_id`,`user_id`),
  FOREIGN KEY (`app_id`, `tenant_id`) REFERENCES `tenants` (`app_id`, `tenant_id`) ON DELETE CASCADE,
  FOREIGN KEY (`app_id`, `user_id`) REFERENCES `app_id_to_user_id` (`app_id`, `user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`app_id`, `primary_or_recipe_user_id`) REFERENCES `app_id_to_user_id` (`app_id`, `user_id`) ON DELETE CASCADE
);

CREATE INDEX all_auth_recipe_users_pagination_index1 ON all_auth_recipe_users
    (app_id, tenant_id, primary_or_recipe_user_time_joined DESC, primary_or_recipe_user_id DESC);

CREATE INDEX all_auth_recipe_users_pagination_index2 ON all_auth_recipe_users
    (app_id, tenant_id, primary_or_recipe_user_time_joined ASC, primary_or_recipe_user_id DESC);

CREATE INDEX all_auth_recipe_users_pagination_index3 ON all_auth_recipe_users
    (recipe_id, app_id, tenant_id, primary_or_recipe_user_time_joined DESC, primary_or_recipe_user_id DESC);

CREATE INDEX all_auth_recipe_users_pagination_index4 ON all_auth_recipe_users
    (recipe_id, app_id, tenant_id, primary_or_recipe_user_time_joined ASC, primary_or_recipe_user_id DESC);

CREATE INDEX all_auth_recipe_users_primary_user_id_index ON all_auth_recipe_users
    (primary_or_recipe_user_id, app_id);

CREATE INDEX all_auth_recipe_users_recipe_id_index ON all_auth_recipe_users
    (app_id, recipe_id, tenant_id);

CREATE TABLE `userid_mapping` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `supertokens_user_id` char(36) NOT NULL,
  `external_user_id` varchar(128) NOT NULL,
  `external_user_id_info` text,
  PRIMARY KEY (`app_id`,`supertokens_user_id`,`external_user_id`),
  UNIQUE KEY `supertokens_user_id` (`app_id`,`supertokens_user_id`),
  UNIQUE KEY `external_user_id` (`app_id`,`external_user_id`),
  FOREIGN KEY (`app_id`, `supertokens_user_id`) REFERENCES `app_id_to_user_id` (`app_id`, `user_id`) ON DELETE CASCADE
);

CREATE TABLE `dashboard_users` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `user_id` char(36) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password_hash` varchar(256) NOT NULL,
  `time_joined` bigint unsigned NOT NULL,
  PRIMARY KEY (`app_id`,`user_id`),
  UNIQUE KEY `email` (`app_id`,`email`),
  FOREIGN KEY (`app_id`) REFERENCES `apps` (`app_id`) ON DELETE CASCADE
);

CREATE TABLE `dashboard_user_sessions` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `session_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `time_created` bigint unsigned NOT NULL,
  `expiry` bigint unsigned NOT NULL,
  PRIMARY KEY (`app_id`,`session_id`),
  KEY `app_id` (`app_id`,`user_id`),
  FOREIGN KEY (`app_id`, `user_id`) REFERENCES `dashboard_users` (`app_id`, `user_id`) ON DELETE CASCADE
);

CREATE INDEX `dashboard_user_sessions_expiry_index` ON `dashboard_user_sessions` (`expiry`);

CREATE TABLE `session_access_token_signing_keys` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `created_at_time` bigint unsigned NOT NULL,
  `value` text,
  PRIMARY KEY (`app_id`,`created_at_time`),
  FOREIGN KEY (`app_id`) REFERENCES `apps` (`app_id`) ON DELETE CASCADE
);

CREATE TABLE `session_info` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `tenant_id` varchar(64) NOT NULL DEFAULT 'public',
  `session_handle` varchar(255) NOT NULL,
  `user_id` varchar(128) NOT NULL,
  `refresh_token_hash_2` varchar(128) NOT NULL,
  `session_data` text,
  `expires_at` bigint unsigned NOT NULL,
  `created_at_time` bigint unsigned NOT NULL,
  `jwt_user_payload` text,
  `use_static_key` tinyint(1) NOT NULL,
  PRIMARY KEY (`app_id`,`tenant_id`,`session_handle`),
  FOREIGN KEY (`app_id`, `tenant_id`) REFERENCES `tenants` (`app_id`, `tenant_id`) ON DELETE CASCADE
);

CREATE INDEX `session_expiry_index` ON `session_info` (`expires_at`);

CREATE TABLE `user_last_active` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `user_id` varchar(128) NOT NULL,
  `last_active_time` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`app_id`,`user_id`),
  FOREIGN KEY (`app_id`) REFERENCES `apps` (`app_id`) ON DELETE CASCADE
);

CREATE TABLE `emailpassword_users` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `user_id` char(36) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password_hash` varchar(256) NOT NULL,
  `time_joined` bigint unsigned NOT NULL,
  PRIMARY KEY (`app_id`,`user_id`),
  FOREIGN KEY (`app_id`, `user_id`) REFERENCES `app_id_to_user_id` (`app_id`, `user_id`) ON DELETE CASCADE
);

CREATE TABLE `emailpassword_user_to_tenant` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `tenant_id` varchar(64) NOT NULL DEFAULT 'public',
  `user_id` char(36) NOT NULL,
  `email` varchar(256) NOT NULL,
  PRIMARY KEY (`app_id`,`tenant_id`,`user_id`),
  UNIQUE KEY `email` (`app_id`,`tenant_id`,`email`),
  FOREIGN KEY (`app_id`, `tenant_id`, `user_id`) REFERENCES `all_auth_recipe_users` (`app_id`, `tenant_id`, `user_id`) ON DELETE CASCADE
);

CREATE TABLE `emailpassword_pswd_reset_tokens` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `user_id` char(36) NOT NULL,
  `token` varchar(128) NOT NULL,
  `token_expiry` bigint unsigned NOT NULL,
  `email` varchar(256),
  PRIMARY KEY (`app_id`,`user_id`,`token`),
  UNIQUE KEY `token` (`token`),
  FOREIGN KEY (`app_id`, `user_id`) REFERENCES `app_id_to_user_id` (`app_id`, `user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX `emailpassword_password_reset_token_expiry_index` ON `emailpassword_pswd_reset_tokens` (`token_expiry`);

CREATE TABLE `emailverification_verified_emails` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `user_id` varchar(128) NOT NULL,
  `email` varchar(256) NOT NULL,
  PRIMARY KEY (`app_id`,`user_id`,`email`),
  FOREIGN KEY (`app_id`) REFERENCES `apps` (`app_id`) ON DELETE CASCADE
);

CREATE TABLE `emailverification_tokens` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `tenant_id` varchar(64) NOT NULL DEFAULT 'public',
  `user_id` varchar(128) NOT NULL,
  `email` varchar(256) NOT NULL,
  `token` varchar(128) NOT NULL,
  `token_expiry` bigint unsigned NOT NULL,
  PRIMARY KEY (`app_id`,`tenant_id`,`user_id`,`email`,`token`),
  UNIQUE KEY `token` (`token`),
  FOREIGN KEY (`app_id`, `tenant_id`) REFERENCES `tenants` (`app_id`, `tenant_id`) ON DELETE CASCADE
);

CREATE INDEX `emailverification_tokens_index` ON `emailverification_tokens` (`token_expiry`);

CREATE TABLE `thirdparty_users` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `third_party_id` varchar(28) NOT NULL,
  `third_party_user_id` varchar(256) NOT NULL,
  `user_id` char(36) NOT NULL,
  `email` varchar(256) NOT NULL,
  `time_joined` bigint unsigned NOT NULL,
  PRIMARY KEY (`app_id`,`user_id`),
  FOREIGN KEY (`app_id`, `user_id`) REFERENCES `app_id_to_user_id` (`app_id`, `user_id`) ON DELETE CASCADE
);

CREATE INDEX `thirdparty_users_email_index` ON `thirdparty_users` (`app_id`,`email`);

CREATE INDEX `thirdparty_users_thirdparty_user_id_index` ON `thirdparty_users` (`app_id`,`third_party_id`,`third_party_user_id`);

CREATE TABLE `thirdparty_user_to_tenant` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `tenant_id` varchar(64) NOT NULL DEFAULT 'public',
  `user_id` char(36) NOT NULL,
  `third_party_id` varchar(28) NOT NULL,
  `third_party_user_id` varchar(256) NOT NULL,
  PRIMARY KEY (`app_id`,`tenant_id`,`user_id`),
  UNIQUE KEY `third_party_user_id` (`app_id`,`tenant_id`,`third_party_id`,`third_party_user_id`),
  FOREIGN KEY (`app_id`, `tenant_id`, `user_id`) REFERENCES `all_auth_recipe_users` (`app_id`, `tenant_id`, `user_id`) ON DELETE CASCADE
);

CREATE TABLE `passwordless_users` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `user_id` char(36) NOT NULL,
  `email` varchar(256) DEFAULT NULL,
  `phone_number` varchar(256) DEFAULT NULL,
  `time_joined` bigint unsigned NOT NULL,
  PRIMARY KEY (`app_id`,`user_id`),
  FOREIGN KEY (`app_id`, `user_id`) REFERENCES `app_id_to_user_id` (`app_id`, `user_id`) ON DELETE CASCADE
);

CREATE TABLE `passwordless_user_to_tenant` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `tenant_id` varchar(64) NOT NULL DEFAULT 'public',
  `user_id` char(36) NOT NULL,
  `email` varchar(256) DEFAULT NULL,
  `phone_number` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`app_id`,`tenant_id`,`user_id`),
  UNIQUE KEY `email` (`app_id`,`tenant_id`,`email`),
  UNIQUE KEY `phone_number` (`app_id`,`tenant_id`,`phone_number`),
  FOREIGN KEY (`app_id`, `tenant_id`, `user_id`) REFERENCES `all_auth_recipe_users` (`app_id`, `tenant_id`, `user_id`) ON DELETE CASCADE
);

CREATE TABLE `passwordless_devices` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `tenant_id` varchar(64) NOT NULL DEFAULT 'public',
  `device_id_hash` char(44) NOT NULL,
  `email` varchar(256) DEFAULT NULL,
  `phone_number` varchar(256) DEFAULT NULL,
  `link_code_salt` char(44) NOT NULL,
  `failed_attempts` int unsigned NOT NULL,
  PRIMARY KEY (`app_id`,`tenant_id`,`device_id_hash`),
  FOREIGN KEY (`app_id`, `tenant_id`) REFERENCES `tenants` (`app_id`, `tenant_id`) ON DELETE CASCADE
);

CREATE INDEX `passwordless_devices_email_index` ON `passwordless_devices` (`app_id`,`tenant_id`,`email`);

CREATE INDEX `passwordless_devices_phone_number_index` ON `passwordless_devices` (`app_id`,`tenant_id`,`phone_number`);

CREATE TABLE `passwordless_codes` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `tenant_id` varchar(64) NOT NULL DEFAULT 'public',
  `code_id` char(36) NOT NULL,
  `device_id_hash` char(44) NOT NULL,
  `link_code_hash` char(44) NOT NULL,
  `created_at` bigint unsigned NOT NULL,
  PRIMARY KEY (`app_id`,`tenant_id`,`code_id`),
  UNIQUE KEY `link_code_hash` (`app_id`,`tenant_id`,`link_code_hash`),
  KEY `app_id` (`app_id`,`tenant_id`,`device_id_hash`),
  FOREIGN KEY (`app_id`, `tenant_id`, `device_id_hash`) REFERENCES `passwordless_devices` (`app_id`, `tenant_id`, `device_id_hash`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX `passwordless_codes_created_at_index` ON `passwordless_codes` (`app_id`,`tenant_id`,`created_at`);

CREATE TABLE `jwt_signing_keys` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `key_id` varchar(255) NOT NULL,
  `key_string` text NOT NULL,
  `algorithm` varchar(10) NOT NULL,
  `created_at` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`app_id`,`key_id`),
  FOREIGN KEY (`app_id`) REFERENCES `apps` (`app_id`) ON DELETE CASCADE
);

CREATE TABLE `user_metadata` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `user_id` varchar(128) NOT NULL,
  `user_metadata` text NOT NULL,
  PRIMARY KEY (`app_id`,`user_id`),
  FOREIGN KEY (`app_id`) REFERENCES `apps` (`app_id`) ON DELETE CASCADE
);

CREATE TABLE `roles` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`app_id`,`role`),
  FOREIGN KEY (`app_id`) REFERENCES `apps` (`app_id`) ON DELETE CASCADE
);

CREATE TABLE `role_permissions` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `role` varchar(255) NOT NULL,
  `permission` varchar(255) NOT NULL,
  PRIMARY KEY (`app_id`,`role`,`permission`),
  FOREIGN KEY (`app_id`, `role`) REFERENCES `roles` (`app_id`, `role`) ON DELETE CASCADE
);

CREATE INDEX `role_permissions_permission_index` ON `role_permissions` (`app_id`,`permission`);

CREATE TABLE `user_roles` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `tenant_id` varchar(64) NOT NULL DEFAULT 'public',
  `user_id` varchar(128) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`app_id`,`tenant_id`,`user_id`,`role`),
  KEY `app_id` (`app_id`,`role`),
  FOREIGN KEY (`app_id`, `role`) REFERENCES `roles` (`app_id`, `role`) ON DELETE CASCADE,
  FOREIGN KEY (`app_id`, `tenant_id`) REFERENCES `tenants` (`app_id`, `tenant_id`) ON DELETE CASCADE
);

CREATE INDEX `user_roles_role_index` ON `user_roles` (`app_id`,`tenant_id`,`role`);

CREATE TABLE `totp_users` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `user_id` varchar(128) NOT NULL,
  PRIMARY KEY (`app_id`,`user_id`),
  FOREIGN KEY (`app_id`) REFERENCES `apps` (`app_id`) ON DELETE CASCADE
);

CREATE TABLE `totp_user_devices` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `user_id` varchar(128) NOT NULL,
  `device_name` varchar(256) NOT NULL,
  `secret_key` varchar(256) NOT NULL,
  `period` int NOT NULL,
  `skew` int NOT NULL,
  `verified` tinyint(1) NOT NULL,
  PRIMARY KEY (`app_id`,`user_id`,`device_name`),
  FOREIGN KEY (`app_id`, `user_id`) REFERENCES `totp_users` (`app_id`, `user_id`) ON DELETE CASCADE
);

CREATE TABLE `totp_used_codes` (
  `app_id` varchar(64) NOT NULL DEFAULT 'public',
  `tenant_id` varchar(64) NOT NULL DEFAULT 'public',
  `user_id` varchar(128) NOT NULL,
  `code` varchar(8) NOT NULL,
  `is_valid` tinyint(1) NOT NULL,
  `expiry_time_ms` bigint unsigned NOT NULL,
  `created_time_ms` bigint unsigned NOT NULL,
  PRIMARY KEY (`app_id`,`tenant_id`,`user_id`,`created_time_ms`),
  KEY `app_id` (`app_id`,`user_id`),
  FOREIGN KEY (`app_id`, `user_id`) REFERENCES `totp_users` (`app_id`, `user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`app_id`, `tenant_id`) REFERENCES `tenants` (`app_id`, `tenant_id`) ON DELETE CASCADE
);

CREATE INDEX `totp_used_codes_expiry_time_ms_index` ON `totp_used_codes` (`app_id`,`tenant_id`,`expiry_time_ms`);
