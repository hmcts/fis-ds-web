provider "azurerm" {
  features {}
}

locals {
  vaultName = "${var.product}-kv-${var.env}"
}

data "azurerm_key_vault" "key_vault" {
  name = local.vaultName
  resource_group_name = "${var.product}-${var.env}"
}


data "azurerm_subnet" "core_infra_redis_subnet" {
  name                 = "core-infra-subnet-1-${var.env}"
  virtual_network_name = "core-infra-vnet-${var.env}"
  resource_group_name  = "core-infra-${var.env}"
}

data "azurerm_key_vault" "fis_key_vault" {
  name                = "fis-kv-${var.env}"
  resource_group_name = "${var.raw_product}-${var.env}"
}

data "azurerm_key_vault" "s2s_vault" {
  name                = "s2s-${var.env}"
  resource_group_name = "rpe-service-auth-provider-${var.env}"
}

data "azurerm_key_vault_secret" "microservicekey_ds_ui" {
  name         = "microservicekey-ds-ui"
  key_vault_id = data.azurerm_key_vault.s2s_vault.id
}

resource "azurerm_key_vault_secret" "s2s-secret" {
  name         = "s2s-secret"
  value        = data.azurerm_key_vault_secret.microservicekey_ds_ui.value
  key_vault_id = data.azurerm_key_vault.fis_key_vault.id
}

data "azurerm_key_vault_secret" "idam-ui-secret" {
  name         = "idam-ui-secret"
  key_vault_id = data.azurerm_key_vault.fis_key_vault.id
}

data "azurerm_key_vault_secret" "idam-system-user-name" {
  name         = "idam-system-user-name"
  key_vault_id = data.azurerm_key_vault.fis_key_vault.id
}

data "azurerm_key_vault_secret" "idam-system-user-password" {
  name         = "idam-system-user-password"
  key_vault_id = data.azurerm_key_vault.fis_key_vault.id
}

module "dss-create-case-session-storage" {
  source                        = "git@github.com:hmcts/cnp-module-redis?ref=master"
  product                       = "${var.raw_product}-${var.citizen_component}-redis"
  location                      = var.location
  env                           = var.env
  common_tags                   = var.common_tags
  private_endpoint_enabled      = true
  redis_version                 = "6"
  business_area                 = "cft"
  public_network_access_enabled = false
  sku_name                      = var.sku_name
  family                        = var.family
  capacity                      = var.capacity

}

resource "azurerm_key_vault_secret" "redis_access_key_dss_create_case" {
  name         = "redis-access-key-dss-create-case"
  value        = module.dss-create-case-session-storage.access_key
  key_vault_id = data.azurerm_key_vault.key_vault.id
}

# data "azurerm_key_vault_secret" "app_insights_instrumental_key" {
#   name = "AppInsightsInstrumentationKey"
#   key_vault_id = "${data.azurerm_key_vault.fis_key_vault.id}"
# }
