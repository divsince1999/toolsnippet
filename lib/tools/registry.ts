// AUTO-GENERATED FILE by scripts/build-registry.mjs — DO NOT EDIT DIRECTLY
import dynamic from "next/dynamic";
import React from "react";
import type { ToolDefinition } from "@/lib/tools/types";
export { buildToolMetadata } from "./helpers";

const ToolSkeleton = () =>
  React.createElement(
    "div",
    { className: "mx-auto w-full max-w-6xl px-4 mt-6 min-h-[420px]" },
    React.createElement("div", {
      className:
        "h-full min-h-[420px] animate-pulse rounded-xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5",
    })
  );

import { definition as def_0_ad_copy_character_counter } from "@/tools/ad-copy-character-counter/definition";
import { definition as def_1_advanced_case_converter } from "@/tools/advanced-case-converter/definition";
import { definition as def_2_aes_encryption_decryption } from "@/tools/aes-encryption-decryption/definition";
import { definition as def_3_amortization_loan_calculator } from "@/tools/amortization-loan-calculator/definition";
import { definition as def_4_anchor_text_optimizer } from "@/tools/anchor-text-optimizer/definition";
import { definition as def_5_angle_converter } from "@/tools/angle-converter/definition";
import { definition as def_6_api_mock_payload_generator } from "@/tools/api-mock-payload-generator/definition";
import { definition as def_7_argon2_hasher } from "@/tools/argon2-hasher/definition";
import { definition as def_8_aspect_ratio_calculator } from "@/tools/aspect-ratio-calculator/definition";
import { definition as def_9_bandwidth_transfer_calculator } from "@/tools/bandwidth-transfer-calculator/definition";
import { definition as def_10_base_62_converter } from "@/tools/base-62-converter/definition";
import { definition as def_11_base_href_url_resolver } from "@/tools/base-href-url-resolver/definition";
import { definition as def_12_base58_converter } from "@/tools/base58-converter/definition";
import { definition as def_13_base64_encoder_decoder } from "@/tools/base64-encoder-decoder/definition";
import { definition as def_14_base64_to_image } from "@/tools/base64-to-image/definition";
import { definition as def_15_basic_auth_header_generator } from "@/tools/basic-auth-header-generator/definition";
import { definition as def_16_bcrypt_generator } from "@/tools/bcrypt-generator/definition";
import { definition as def_17_binary_arithmetic_calculator } from "@/tools/binary-arithmetic-calculator/definition";
import { definition as def_18_binary_to_text } from "@/tools/binary-to-text/definition";
import { definition as def_19_bitwise_calculator } from "@/tools/bitwise-calculator/definition";
import { definition as def_20_bytes_unit_converter } from "@/tools/bytes-unit-converter/definition";
import { definition as def_21_case_converter_camel_snake_kebab } from "@/tools/case-converter-camel-snake-kebab/definition";
import { definition as def_22_cert_inspector } from "@/tools/cert-inspector/definition";
import { definition as def_23_character_counter } from "@/tools/character-counter/definition";
import { definition as def_24_chmod_calculator } from "@/tools/chmod-calculator/definition";
import { definition as def_25_color_contrast_checker } from "@/tools/color-contrast-checker/definition";
import { definition as def_26_color_shades_generator } from "@/tools/color-shades-generator/definition";
import { definition as def_27_compound_interest_calculator } from "@/tools/compound-interest-calculator/definition";
import { definition as def_28_content_security_policy_generator } from "@/tools/content-security-policy-generator/definition";
import { definition as def_29_cors_header_generator } from "@/tools/cors-header-generator/definition";
import { definition as def_30_crc32_checksum } from "@/tools/crc32-checksum/definition";
import { definition as def_31_cron_descriptor } from "@/tools/cron-descriptor/definition";
import { definition as def_32_cron_expression_validator } from "@/tools/cron-expression-validator/definition";
import { definition as def_33_cron_job_generator } from "@/tools/cron-job-generator/definition";
import { definition as def_34_csr_generator } from "@/tools/csr-generator/definition";
import { definition as def_35_css_animation_keyframes_generator } from "@/tools/css-animation-keyframes-generator/definition";
import { definition as def_36_css_border_radius_generator } from "@/tools/css-border-radius-generator/definition";
import { definition as def_37_css_box_shadow_generator } from "@/tools/css-box-shadow-generator/definition";
import { definition as def_38_css_clamp_calculator } from "@/tools/css-clamp-calculator/definition";
import { definition as def_39_css_clip_path_generator } from "@/tools/css-clip-path-generator/definition";
import { definition as def_40_css_filter_generator } from "@/tools/css-filter-generator/definition";
import { definition as def_41_css_flexbox_playground } from "@/tools/css-flexbox-playground/definition";
import { definition as def_42_css_formatter } from "@/tools/css-formatter/definition";
import { definition as def_43_css_glassmorphism_generator } from "@/tools/css-glassmorphism-generator/definition";
import { definition as def_44_css_gradient_generator } from "@/tools/css-gradient-generator/definition";
import { definition as def_45_css_grid_generator } from "@/tools/css-grid-generator/definition";
import { definition as def_46_css_minifier } from "@/tools/css-minifier/definition";
import { definition as def_47_css_neumorphism_generator } from "@/tools/css-neumorphism-generator/definition";
import { definition as def_48_css_text_shadow_generator } from "@/tools/css-text-shadow-generator/definition";
import { definition as def_49_css_to_tailwind } from "@/tools/css-to-tailwind/definition";
import { definition as def_50_css_triangle_generator } from "@/tools/css-triangle-generator/definition";
import { definition as def_51_csv_column_extractor } from "@/tools/csv-column-extractor/definition";
import { definition as def_52_csv_to_json } from "@/tools/csv-to-json/definition";
import { definition as def_53_csv_to_markdown_table } from "@/tools/csv-to-markdown-table/definition";
import { definition as def_54_csv_to_sql_inserts } from "@/tools/csv-to-sql-inserts/definition";
import { definition as def_55_cuid_generator } from "@/tools/cuid-generator/definition";
import { definition as def_56_curl_to_fetch } from "@/tools/curl-to-fetch/definition";
import { definition as def_57_curl_to_go_http } from "@/tools/curl-to-go-http/definition";
import { definition as def_58_curl_to_node_axios } from "@/tools/curl-to-node-axios/definition";
import { definition as def_59_curl_to_php_curl } from "@/tools/curl-to-php-curl/definition";
import { definition as def_60_curl_to_python_requests } from "@/tools/curl-to-python-requests/definition";
import { definition as def_61_date_to_unix_timestamp } from "@/tools/date-to-unix-timestamp/definition";
import { definition as def_62_dns_record_generator } from "@/tools/dns-record-generator/definition";
import { definition as def_63_dockerfile_generator } from "@/tools/dockerfile-generator/definition";
import { definition as def_64_duplicate_line_remover } from "@/tools/duplicate-line-remover/definition";
import { definition as def_65_email_extractor } from "@/tools/email-extractor/definition";
import { definition as def_66_email_subject_line_tester } from "@/tools/email-subject-line-tester/definition";
import { definition as def_67_energy_power_converter } from "@/tools/energy-power-converter/definition";
import { definition as def_68_env_to_json_converter } from "@/tools/env-to-json-converter/definition";
import { definition as def_69_factorial_calculator } from "@/tools/factorial-calculator/definition";
import { definition as def_70_faq_schema_generator } from "@/tools/faq-schema-generator/definition";
import { definition as def_71_find_and_replace } from "@/tools/find-and-replace/definition";
import { definition as def_72_floating_point_converter } from "@/tools/floating-point-converter/definition";
import { definition as def_73_fraction_calculator } from "@/tools/fraction-calculator/definition";
import { definition as def_74_gcd_lcm_calculator } from "@/tools/gcd-lcm-calculator/definition";
import { definition as def_75_gitignore_generator } from "@/tools/gitignore-generator/definition";
import { definition as def_76_graphql_query_prettifier } from "@/tools/graphql-query-prettifier/definition";
import { definition as def_77_hash_comparator } from "@/tools/hash-comparator/definition";
import { definition as def_78_hash_generator } from "@/tools/hash-generator/definition";
import { definition as def_79_headline_analyzer } from "@/tools/headline-analyzer/definition";
import { definition as def_80_hex_color_code_extractor } from "@/tools/hex-color-code-extractor/definition";
import { definition as def_81_hex_to_ascii } from "@/tools/hex-to-ascii/definition";
import { definition as def_82_hex_to_rgb } from "@/tools/hex-to-rgb/definition";
import { definition as def_83_hmac_generator } from "@/tools/hmac-generator/definition";
import { definition as def_84_how_to_schema_generator } from "@/tools/how-to-schema-generator/definition";
import { definition as def_85_html_color_picker } from "@/tools/html-color-picker/definition";
import { definition as def_86_html_entity_decoder } from "@/tools/html-entity-decoder/definition";
import { definition as def_87_html_entity_encoder } from "@/tools/html-entity-encoder/definition";
import { definition as def_88_html_formatter } from "@/tools/html-formatter/definition";
import { definition as def_89_html_minifier } from "@/tools/html-minifier/definition";
import { definition as def_90_html_table_to_json } from "@/tools/html-table-to-json/definition";
import { definition as def_91_html_to_markdown } from "@/tools/html-to-markdown/definition";
import { definition as def_92_htpasswd_generator } from "@/tools/htpasswd-generator/definition";
import { definition as def_93_http_header_analyzer } from "@/tools/http-header-analyzer/definition";
import { definition as def_94_http_headers_parser } from "@/tools/http-headers-parser/definition";
import { definition as def_95_http_status_code_lookup } from "@/tools/http-status-code-lookup/definition";
import { definition as def_96_image_compressor } from "@/tools/image-compressor/definition";
import { definition as def_97_image_to_base64 } from "@/tools/image-to-base64/definition";
import { definition as def_98_invisible_character_detector } from "@/tools/invisible-character-detector/definition";
import { definition as def_99_ip_geolocation_lookup } from "@/tools/ip-geolocation-lookup/definition";
import { definition as def_100_ip_range_to_cidr } from "@/tools/ip-range-to-cidr/definition";
import { definition as def_101_ipv4_subnet_calculator } from "@/tools/ipv4-subnet-calculator/definition";
import { definition as def_102_ipv4_to_ipv6_converter } from "@/tools/ipv4-to-ipv6-converter/definition";
import { definition as def_103_js_formatter } from "@/tools/js-formatter/definition";
import { definition as def_104_js_minifier } from "@/tools/js-minifier/definition";
import { definition as def_105_js_obfuscation_detector } from "@/tools/js-obfuscation-detector/definition";
import { definition as def_106_json_formatter } from "@/tools/json-formatter/definition";
import { definition as def_107_json_key_sorter } from "@/tools/json-key-sorter/definition";
import { definition as def_108_json_ld_generator } from "@/tools/json-ld-generator/definition";
import { definition as def_109_json_minifier } from "@/tools/json-minifier/definition";
import { definition as def_110_json_schema_to_typescript } from "@/tools/json-schema-to-typescript/definition";
import { definition as def_111_json_size_analyzer } from "@/tools/json-size-analyzer/definition";
import { definition as def_112_json_to_csv } from "@/tools/json-to-csv/definition";
import { definition as def_113_json_to_go_struct } from "@/tools/json-to-go-struct/definition";
import { definition as def_114_json_to_graphql_schema } from "@/tools/json-to-graphql-schema/definition";
import { definition as def_115_json_to_json_schema } from "@/tools/json-to-json-schema/definition";
import { definition as def_116_json_to_kotlin } from "@/tools/json-to-kotlin/definition";
import { definition as def_117_json_to_properties } from "@/tools/json-to-properties/definition";
import { definition as def_118_json_to_python_pydantic } from "@/tools/json-to-python-pydantic/definition";
import { definition as def_119_json_to_rust_serde } from "@/tools/json-to-rust-serde/definition";
import { definition as def_120_json_to_sql_schema } from "@/tools/json-to-sql-schema/definition";
import { definition as def_121_json_to_toml } from "@/tools/json-to-toml/definition";
import { definition as def_122_json_to_typescript } from "@/tools/json-to-typescript/definition";
import { definition as def_123_json_to_xml } from "@/tools/json-to-xml/definition";
import { definition as def_124_json_to_xml_schema_xsd } from "@/tools/json-to-xml-schema-xsd/definition";
import { definition as def_125_json_to_yaml } from "@/tools/json-to-yaml/definition";
import { definition as def_126_json_to_zod } from "@/tools/json-to-zod/definition";
import { definition as def_127_json_validator } from "@/tools/json-validator/definition";
import { definition as def_128_jsonpath_evaluator } from "@/tools/jsonpath-evaluator/definition";
import { definition as def_129_jwt_builder } from "@/tools/jwt-builder/definition";
import { definition as def_130_jwt_decoder } from "@/tools/jwt-decoder/definition";
import { definition as def_131_jwt_generator } from "@/tools/jwt-generator/definition";
import { definition as def_132_keyword_density_analyzer } from "@/tools/keyword-density-analyzer/definition";
import { definition as def_133_license_text_generator } from "@/tools/license-text-generator/definition";
import { definition as def_134_line_counter } from "@/tools/line-counter/definition";
import { definition as def_135_line_numberer } from "@/tools/line-numberer/definition";
import { definition as def_136_list_randomizer } from "@/tools/list-randomizer/definition";
import { definition as def_137_lorem_ipsum_generator } from "@/tools/lorem-ipsum-generator/definition";
import { definition as def_138_mac_address_formatter } from "@/tools/mac-address-formatter/definition";
import { definition as def_139_markdown_heading_extractor } from "@/tools/markdown-heading-extractor/definition";
import { definition as def_140_markdown_previewer } from "@/tools/markdown-previewer/definition";
import { definition as def_141_markdown_table_to_csv } from "@/tools/markdown-table-to-csv/definition";
import { definition as def_142_markdown_to_html } from "@/tools/markdown-to-html/definition";
import { definition as def_143_markdown_to_pdf } from "@/tools/markdown-to-pdf/definition";
import { definition as def_144_markdown_to_pdf_cleaner } from "@/tools/markdown-to-pdf-cleaner/definition";
import { definition as def_145_matrix_calculator } from "@/tools/matrix-calculator/definition";
import { definition as def_146_md5_hash_generator } from "@/tools/md5-hash-generator/definition";
import { definition as def_147_meta_description_previewer } from "@/tools/meta-description-previewer/definition";
import { definition as def_148_meta_robots_tag_generator } from "@/tools/meta-robots-tag-generator/definition";
import { definition as def_149_meta_tag_generator } from "@/tools/meta-tag-generator/definition";
import { definition as def_150_mime_type_lookup } from "@/tools/mime-type-lookup/definition";
import { definition as def_151_modulo_inverse_calculator } from "@/tools/modulo-inverse-calculator/definition";
import { definition as def_152_morse_code_converter } from "@/tools/morse-code-converter/definition";
import { definition as def_153_nanoid_generator } from "@/tools/nanoid-generator/definition";
import { definition as def_154_ndjson_to_json } from "@/tools/ndjson-to-json/definition";
import { definition as def_155_nginx_config_generator } from "@/tools/nginx-config-generator/definition";
import { definition as def_156_number_base_converter } from "@/tools/number-base-converter/definition";
import { definition as def_157_number_to_words } from "@/tools/number-to-words/definition";
import { definition as def_158_open_graph_meta_generator } from "@/tools/open-graph-meta-generator/definition";
import { definition as def_159_package_json_validator } from "@/tools/package-json-validator/definition";
import { definition as def_160_palette_generator } from "@/tools/palette-generator/definition";
import { definition as def_161_passive_to_active_voice_detector } from "@/tools/passive-to-active-voice-detector/definition";
import { definition as def_162_password_generator } from "@/tools/password-generator/definition";
import { definition as def_163_password_strength_checker } from "@/tools/password-strength-checker/definition";
import { definition as def_164_percentage_calculator } from "@/tools/percentage-calculator/definition";
import { definition as def_165_prefix_suffix_adder } from "@/tools/prefix-suffix-adder/definition";
import { definition as def_166_pressure_unit_converter } from "@/tools/pressure-unit-converter/definition";
import { definition as def_167_prime_number_checker } from "@/tools/prime-number-checker/definition";
import { definition as def_168_properties_to_json } from "@/tools/properties-to-json/definition";
import { definition as def_169_protobuf_to_json } from "@/tools/protobuf-to-json/definition";
import { definition as def_170_punycode_converter } from "@/tools/punycode-converter/definition";
import { definition as def_171_px_to_rem_converter } from "@/tools/px-to-rem-converter/definition";
import { definition as def_172_qr_code_generator } from "@/tools/qr-code-generator/definition";
import { definition as def_173_query_string_parser } from "@/tools/query-string-parser/definition";
import { definition as def_174_random_number_generator } from "@/tools/random-number-generator/definition";
import { definition as def_175_read_time_calculator } from "@/tools/read-time-calculator/definition";
import { definition as def_176_reading_grade_level_calculator } from "@/tools/reading-grade-level-calculator/definition";
import { definition as def_177_readme_badge_generator } from "@/tools/readme-badge-generator/definition";
import { definition as def_178_redirect_rule_generator } from "@/tools/redirect-rule-generator/definition";
import { definition as def_179_regex_cheatsheet_tester } from "@/tools/regex-cheatsheet-tester/definition";
import { definition as def_180_regex_tester } from "@/tools/regex-tester/definition";
import { definition as def_181_rgb_to_hex } from "@/tools/rgb-to-hex/definition";
import { definition as def_182_ripemd160_generator } from "@/tools/ripemd160-generator/definition";
import { definition as def_183_robots_txt_generator } from "@/tools/robots-txt-generator/definition";
import { definition as def_184_roman_numeral_converter } from "@/tools/roman-numeral-converter/definition";
import { definition as def_185_rot13_converter } from "@/tools/rot13-converter/definition";
import { definition as def_186_rsa_key_generator } from "@/tools/rsa-key-generator/definition";
import { definition as def_187_sales_tax_vat_calculator } from "@/tools/sales-tax-vat-calculator/definition";
import { definition as def_188_scientific_notation_converter } from "@/tools/scientific-notation-converter/definition";
import { definition as def_189_screen_ppi_calculator } from "@/tools/screen-ppi-calculator/definition";
import { definition as def_190_semver_comparator } from "@/tools/semver-comparator/definition";
import { definition as def_191_sha3_hash_generator } from "@/tools/sha3-hash-generator/definition";
import { definition as def_192_sha512_hash_generator } from "@/tools/sha512-hash-generator/definition";
import { definition as def_193_sitemap_url_extractor } from "@/tools/sitemap-url-extractor/definition";
import { definition as def_194_social_media_post_formatter } from "@/tools/social-media-post-formatter/definition";
import { definition as def_195_social_share_url_generator } from "@/tools/social-share-url-generator/definition";
import { definition as def_196_speed_distance_time_calculator } from "@/tools/speed-distance-time-calculator/definition";
import { definition as def_197_sql_formatter } from "@/tools/sql-formatter/definition";
import { definition as def_198_sql_query_explainer } from "@/tools/sql-query-explainer/definition";
import { definition as def_199_sql_query_minifier } from "@/tools/sql-query-minifier/definition";
import { definition as def_200_statistics_calculator } from "@/tools/statistics-calculator/definition";
import { definition as def_201_string_escape } from "@/tools/string-escape/definition";
import { definition as def_202_string_unescape } from "@/tools/string-unescape/definition";
import { definition as def_203_svg_optimizer } from "@/tools/svg-optimizer/definition";
import { definition as def_204_svg_path_visualizer } from "@/tools/svg-path-visualizer/definition";
import { definition as def_205_svg_to_css_data_uri } from "@/tools/svg-to-css-data-uri/definition";
import { definition as def_206_svg_to_jsx } from "@/tools/svg-to-jsx/definition";
import { definition as def_207_temperature_converter } from "@/tools/temperature-converter/definition";
import { definition as def_208_text_case } from "@/tools/text-case/definition";
import { definition as def_209_text_cliche_finder } from "@/tools/text-cliche-finder/definition";
import { definition as def_210_text_diff_checker } from "@/tools/text-diff-checker/definition";
import { definition as def_211_text_indent_formatter } from "@/tools/text-indent-formatter/definition";
import { definition as def_212_text_reverser } from "@/tools/text-reverser/definition";
import { definition as def_213_text_sentiment_analyzer } from "@/tools/text-sentiment-analyzer/definition";
import { definition as def_214_text_sorter } from "@/tools/text-sorter/definition";
import { definition as def_215_text_to_binary } from "@/tools/text-to-binary/definition";
import { definition as def_216_text_trimmer } from "@/tools/text-trimmer/definition";
import { definition as def_217_text_word_wrap } from "@/tools/text-word-wrap/definition";
import { definition as def_218_time_duration_calculator } from "@/tools/time-duration-calculator/definition";
import { definition as def_219_timestamp_to_iso } from "@/tools/timestamp-to-iso/definition";
import { definition as def_220_toml_to_json } from "@/tools/toml-to-json/definition";
import { definition as def_221_tsv_to_csv } from "@/tools/tsv-to-csv/definition";
import { definition as def_222_twitter_tweet_counter } from "@/tools/twitter-tweet-counter/definition";
import { definition as def_223_typescript_playground } from "@/tools/typescript-playground/definition";
import { definition as def_224_ulid_generator } from "@/tools/ulid-generator/definition";
import { definition as def_225_unicode_escape_converter } from "@/tools/unicode-escape-converter/definition";
import { definition as def_226_unix_timestamp_converter } from "@/tools/unix-timestamp-converter/definition";
import { definition as def_227_url_encoder_decoder } from "@/tools/url-encoder-decoder/definition";
import { definition as def_228_url_extractor } from "@/tools/url-extractor/definition";
import { definition as def_229_url_parser } from "@/tools/url-parser/definition";
import { definition as def_230_url_slug_generator } from "@/tools/url-slug-generator/definition";
import { definition as def_231_user_agent_parser } from "@/tools/user-agent-parser/definition";
import { definition as def_232_user_snippet_generator } from "@/tools/user-snippet-generator/definition";
import { definition as def_233_utm_builder } from "@/tools/utm-builder/definition";
import { definition as def_234_uuid_generator } from "@/tools/uuid-generator/definition";
import { definition as def_235_websocket_frame_analyzer } from "@/tools/websocket-frame-analyzer/definition";
import { definition as def_236_whitespace_remover } from "@/tools/whitespace-remover/definition";
import { definition as def_237_whois_domain_parser } from "@/tools/whois-domain-parser/definition";
import { definition as def_238_word_counter } from "@/tools/word-counter/definition";
import { definition as def_239_xml_formatter } from "@/tools/xml-formatter/definition";
import { definition as def_240_xml_minifier } from "@/tools/xml-minifier/definition";
import { definition as def_241_xml_to_json } from "@/tools/xml-to-json/definition";
import { definition as def_242_yaml_to_json } from "@/tools/yaml-to-json/definition";
export const tools: ToolDefinition[] = [
  def_0_ad_copy_character_counter,
  def_1_advanced_case_converter,
  def_2_aes_encryption_decryption,
  def_3_amortization_loan_calculator,
  def_4_anchor_text_optimizer,
  def_5_angle_converter,
  def_6_api_mock_payload_generator,
  def_7_argon2_hasher,
  def_8_aspect_ratio_calculator,
  def_9_bandwidth_transfer_calculator,
  def_10_base_62_converter,
  def_11_base_href_url_resolver,
  def_12_base58_converter,
  def_13_base64_encoder_decoder,
  def_14_base64_to_image,
  def_15_basic_auth_header_generator,
  def_16_bcrypt_generator,
  def_17_binary_arithmetic_calculator,
  def_18_binary_to_text,
  def_19_bitwise_calculator,
  def_20_bytes_unit_converter,
  def_21_case_converter_camel_snake_kebab,
  def_22_cert_inspector,
  def_23_character_counter,
  def_24_chmod_calculator,
  def_25_color_contrast_checker,
  def_26_color_shades_generator,
  def_27_compound_interest_calculator,
  def_28_content_security_policy_generator,
  def_29_cors_header_generator,
  def_30_crc32_checksum,
  def_31_cron_descriptor,
  def_32_cron_expression_validator,
  def_33_cron_job_generator,
  def_34_csr_generator,
  def_35_css_animation_keyframes_generator,
  def_36_css_border_radius_generator,
  def_37_css_box_shadow_generator,
  def_38_css_clamp_calculator,
  def_39_css_clip_path_generator,
  def_40_css_filter_generator,
  def_41_css_flexbox_playground,
  def_42_css_formatter,
  def_43_css_glassmorphism_generator,
  def_44_css_gradient_generator,
  def_45_css_grid_generator,
  def_46_css_minifier,
  def_47_css_neumorphism_generator,
  def_48_css_text_shadow_generator,
  def_49_css_to_tailwind,
  def_50_css_triangle_generator,
  def_51_csv_column_extractor,
  def_52_csv_to_json,
  def_53_csv_to_markdown_table,
  def_54_csv_to_sql_inserts,
  def_55_cuid_generator,
  def_56_curl_to_fetch,
  def_57_curl_to_go_http,
  def_58_curl_to_node_axios,
  def_59_curl_to_php_curl,
  def_60_curl_to_python_requests,
  def_61_date_to_unix_timestamp,
  def_62_dns_record_generator,
  def_63_dockerfile_generator,
  def_64_duplicate_line_remover,
  def_65_email_extractor,
  def_66_email_subject_line_tester,
  def_67_energy_power_converter,
  def_68_env_to_json_converter,
  def_69_factorial_calculator,
  def_70_faq_schema_generator,
  def_71_find_and_replace,
  def_72_floating_point_converter,
  def_73_fraction_calculator,
  def_74_gcd_lcm_calculator,
  def_75_gitignore_generator,
  def_76_graphql_query_prettifier,
  def_77_hash_comparator,
  def_78_hash_generator,
  def_79_headline_analyzer,
  def_80_hex_color_code_extractor,
  def_81_hex_to_ascii,
  def_82_hex_to_rgb,
  def_83_hmac_generator,
  def_84_how_to_schema_generator,
  def_85_html_color_picker,
  def_86_html_entity_decoder,
  def_87_html_entity_encoder,
  def_88_html_formatter,
  def_89_html_minifier,
  def_90_html_table_to_json,
  def_91_html_to_markdown,
  def_92_htpasswd_generator,
  def_93_http_header_analyzer,
  def_94_http_headers_parser,
  def_95_http_status_code_lookup,
  def_96_image_compressor,
  def_97_image_to_base64,
  def_98_invisible_character_detector,
  def_99_ip_geolocation_lookup,
  def_100_ip_range_to_cidr,
  def_101_ipv4_subnet_calculator,
  def_102_ipv4_to_ipv6_converter,
  def_103_js_formatter,
  def_104_js_minifier,
  def_105_js_obfuscation_detector,
  def_106_json_formatter,
  def_107_json_key_sorter,
  def_108_json_ld_generator,
  def_109_json_minifier,
  def_110_json_schema_to_typescript,
  def_111_json_size_analyzer,
  def_112_json_to_csv,
  def_113_json_to_go_struct,
  def_114_json_to_graphql_schema,
  def_115_json_to_json_schema,
  def_116_json_to_kotlin,
  def_117_json_to_properties,
  def_118_json_to_python_pydantic,
  def_119_json_to_rust_serde,
  def_120_json_to_sql_schema,
  def_121_json_to_toml,
  def_122_json_to_typescript,
  def_123_json_to_xml,
  def_124_json_to_xml_schema_xsd,
  def_125_json_to_yaml,
  def_126_json_to_zod,
  def_127_json_validator,
  def_128_jsonpath_evaluator,
  def_129_jwt_builder,
  def_130_jwt_decoder,
  def_131_jwt_generator,
  def_132_keyword_density_analyzer,
  def_133_license_text_generator,
  def_134_line_counter,
  def_135_line_numberer,
  def_136_list_randomizer,
  def_137_lorem_ipsum_generator,
  def_138_mac_address_formatter,
  def_139_markdown_heading_extractor,
  def_140_markdown_previewer,
  def_141_markdown_table_to_csv,
  def_142_markdown_to_html,
  def_143_markdown_to_pdf,
  def_144_markdown_to_pdf_cleaner,
  def_145_matrix_calculator,
  def_146_md5_hash_generator,
  def_147_meta_description_previewer,
  def_148_meta_robots_tag_generator,
  def_149_meta_tag_generator,
  def_150_mime_type_lookup,
  def_151_modulo_inverse_calculator,
  def_152_morse_code_converter,
  def_153_nanoid_generator,
  def_154_ndjson_to_json,
  def_155_nginx_config_generator,
  def_156_number_base_converter,
  def_157_number_to_words,
  def_158_open_graph_meta_generator,
  def_159_package_json_validator,
  def_160_palette_generator,
  def_161_passive_to_active_voice_detector,
  def_162_password_generator,
  def_163_password_strength_checker,
  def_164_percentage_calculator,
  def_165_prefix_suffix_adder,
  def_166_pressure_unit_converter,
  def_167_prime_number_checker,
  def_168_properties_to_json,
  def_169_protobuf_to_json,
  def_170_punycode_converter,
  def_171_px_to_rem_converter,
  def_172_qr_code_generator,
  def_173_query_string_parser,
  def_174_random_number_generator,
  def_175_read_time_calculator,
  def_176_reading_grade_level_calculator,
  def_177_readme_badge_generator,
  def_178_redirect_rule_generator,
  def_179_regex_cheatsheet_tester,
  def_180_regex_tester,
  def_181_rgb_to_hex,
  def_182_ripemd160_generator,
  def_183_robots_txt_generator,
  def_184_roman_numeral_converter,
  def_185_rot13_converter,
  def_186_rsa_key_generator,
  def_187_sales_tax_vat_calculator,
  def_188_scientific_notation_converter,
  def_189_screen_ppi_calculator,
  def_190_semver_comparator,
  def_191_sha3_hash_generator,
  def_192_sha512_hash_generator,
  def_193_sitemap_url_extractor,
  def_194_social_media_post_formatter,
  def_195_social_share_url_generator,
  def_196_speed_distance_time_calculator,
  def_197_sql_formatter,
  def_198_sql_query_explainer,
  def_199_sql_query_minifier,
  def_200_statistics_calculator,
  def_201_string_escape,
  def_202_string_unescape,
  def_203_svg_optimizer,
  def_204_svg_path_visualizer,
  def_205_svg_to_css_data_uri,
  def_206_svg_to_jsx,
  def_207_temperature_converter,
  def_208_text_case,
  def_209_text_cliche_finder,
  def_210_text_diff_checker,
  def_211_text_indent_formatter,
  def_212_text_reverser,
  def_213_text_sentiment_analyzer,
  def_214_text_sorter,
  def_215_text_to_binary,
  def_216_text_trimmer,
  def_217_text_word_wrap,
  def_218_time_duration_calculator,
  def_219_timestamp_to_iso,
  def_220_toml_to_json,
  def_221_tsv_to_csv,
  def_222_twitter_tweet_counter,
  def_223_typescript_playground,
  def_224_ulid_generator,
  def_225_unicode_escape_converter,
  def_226_unix_timestamp_converter,
  def_227_url_encoder_decoder,
  def_228_url_extractor,
  def_229_url_parser,
  def_230_url_slug_generator,
  def_231_user_agent_parser,
  def_232_user_snippet_generator,
  def_233_utm_builder,
  def_234_uuid_generator,
  def_235_websocket_frame_analyzer,
  def_236_whitespace_remover,
  def_237_whois_domain_parser,
  def_238_word_counter,
  def_239_xml_formatter,
  def_240_xml_minifier,
  def_241_xml_to_json,
  def_242_yaml_to_json,
];

export const ToolRegistry: Record<string, React.ComponentType> = {
  "ad-copy-character-counter": dynamic(() => import("@/tools/ad-copy-character-counter/component"), { loading: ToolSkeleton }),
  "advanced-case-converter": dynamic(() => import("@/tools/advanced-case-converter/component"), { loading: ToolSkeleton }),
  "aes-encryption-decryption": dynamic(() => import("@/tools/aes-encryption-decryption/component"), { loading: ToolSkeleton }),
  "amortization-loan-calculator": dynamic(() => import("@/tools/amortization-loan-calculator/component"), { loading: ToolSkeleton }),
  "anchor-text-optimizer": dynamic(() => import("@/tools/anchor-text-optimizer/component"), { loading: ToolSkeleton }),
  "angle-converter": dynamic(() => import("@/tools/angle-converter/component"), { loading: ToolSkeleton }),
  "api-mock-payload-generator": dynamic(() => import("@/tools/api-mock-payload-generator/component"), { loading: ToolSkeleton }),
  "argon2-hasher": dynamic(() => import("@/tools/argon2-hasher/component"), { loading: ToolSkeleton }),
  "aspect-ratio-calculator": dynamic(() => import("@/tools/aspect-ratio-calculator/component"), { loading: ToolSkeleton }),
  "bandwidth-transfer-calculator": dynamic(() => import("@/tools/bandwidth-transfer-calculator/component"), { loading: ToolSkeleton }),
  "base-62-converter": dynamic(() => import("@/tools/base-62-converter/component"), { loading: ToolSkeleton }),
  "base-href-url-resolver": dynamic(() => import("@/tools/base-href-url-resolver/component"), { loading: ToolSkeleton }),
  "base58-converter": dynamic(() => import("@/tools/base58-converter/component"), { loading: ToolSkeleton }),
  "base64-encoder-decoder": dynamic(() => import("@/tools/base64-encoder-decoder/component"), { loading: ToolSkeleton }),
  "base64-to-image": dynamic(() => import("@/tools/base64-to-image/component"), { loading: ToolSkeleton }),
  "basic-auth-header-generator": dynamic(() => import("@/tools/basic-auth-header-generator/component"), { loading: ToolSkeleton }),
  "bcrypt-generator": dynamic(() => import("@/tools/bcrypt-generator/component"), { loading: ToolSkeleton }),
  "binary-arithmetic-calculator": dynamic(() => import("@/tools/binary-arithmetic-calculator/component"), { loading: ToolSkeleton }),
  "binary-to-text": dynamic(() => import("@/tools/binary-to-text/component"), { loading: ToolSkeleton }),
  "bitwise-calculator": dynamic(() => import("@/tools/bitwise-calculator/component"), { loading: ToolSkeleton }),
  "bytes-unit-converter": dynamic(() => import("@/tools/bytes-unit-converter/component"), { loading: ToolSkeleton }),
  "case-converter-camel-snake-kebab": dynamic(() => import("@/tools/case-converter-camel-snake-kebab/component"), { loading: ToolSkeleton }),
  "cert-inspector": dynamic(() => import("@/tools/cert-inspector/component"), { loading: ToolSkeleton }),
  "character-counter": dynamic(() => import("@/tools/character-counter/component"), { loading: ToolSkeleton }),
  "chmod-calculator": dynamic(() => import("@/tools/chmod-calculator/component"), { loading: ToolSkeleton }),
  "color-contrast-checker": dynamic(() => import("@/tools/color-contrast-checker/component"), { loading: ToolSkeleton }),
  "color-shades-generator": dynamic(() => import("@/tools/color-shades-generator/component"), { loading: ToolSkeleton }),
  "compound-interest-calculator": dynamic(() => import("@/tools/compound-interest-calculator/component"), { loading: ToolSkeleton }),
  "content-security-policy-generator": dynamic(() => import("@/tools/content-security-policy-generator/component"), { loading: ToolSkeleton }),
  "cors-header-generator": dynamic(() => import("@/tools/cors-header-generator/component"), { loading: ToolSkeleton }),
  "crc32-checksum": dynamic(() => import("@/tools/crc32-checksum/component"), { loading: ToolSkeleton }),
  "cron-descriptor": dynamic(() => import("@/tools/cron-descriptor/component"), { loading: ToolSkeleton }),
  "cron-expression-validator": dynamic(() => import("@/tools/cron-expression-validator/component"), { loading: ToolSkeleton }),
  "cron-job-generator": dynamic(() => import("@/tools/cron-job-generator/component"), { loading: ToolSkeleton }),
  "csr-generator": dynamic(() => import("@/tools/csr-generator/component"), { loading: ToolSkeleton }),
  "css-animation-keyframes-generator": dynamic(() => import("@/tools/css-animation-keyframes-generator/component"), { loading: ToolSkeleton }),
  "css-border-radius-generator": dynamic(() => import("@/tools/css-border-radius-generator/component"), { loading: ToolSkeleton }),
  "css-box-shadow-generator": dynamic(() => import("@/tools/css-box-shadow-generator/component"), { loading: ToolSkeleton }),
  "css-clamp-calculator": dynamic(() => import("@/tools/css-clamp-calculator/component"), { loading: ToolSkeleton }),
  "css-clip-path-generator": dynamic(() => import("@/tools/css-clip-path-generator/component"), { loading: ToolSkeleton }),
  "css-filter-generator": dynamic(() => import("@/tools/css-filter-generator/component"), { loading: ToolSkeleton }),
  "css-flexbox-playground": dynamic(() => import("@/tools/css-flexbox-playground/component"), { loading: ToolSkeleton }),
  "css-formatter": dynamic(() => import("@/tools/css-formatter/component"), { loading: ToolSkeleton }),
  "css-glassmorphism-generator": dynamic(() => import("@/tools/css-glassmorphism-generator/component"), { loading: ToolSkeleton }),
  "css-gradient-generator": dynamic(() => import("@/tools/css-gradient-generator/component"), { loading: ToolSkeleton }),
  "css-grid-generator": dynamic(() => import("@/tools/css-grid-generator/component"), { loading: ToolSkeleton }),
  "css-minifier": dynamic(() => import("@/tools/css-minifier/component"), { loading: ToolSkeleton }),
  "css-neumorphism-generator": dynamic(() => import("@/tools/css-neumorphism-generator/component"), { loading: ToolSkeleton }),
  "css-text-shadow-generator": dynamic(() => import("@/tools/css-text-shadow-generator/component"), { loading: ToolSkeleton }),
  "css-to-tailwind": dynamic(() => import("@/tools/css-to-tailwind/component"), { loading: ToolSkeleton }),
  "css-triangle-generator": dynamic(() => import("@/tools/css-triangle-generator/component"), { loading: ToolSkeleton }),
  "csv-column-extractor": dynamic(() => import("@/tools/csv-column-extractor/component"), { loading: ToolSkeleton }),
  "csv-to-json": dynamic(() => import("@/tools/csv-to-json/component"), { loading: ToolSkeleton }),
  "csv-to-markdown-table": dynamic(() => import("@/tools/csv-to-markdown-table/component"), { loading: ToolSkeleton }),
  "csv-to-sql-inserts": dynamic(() => import("@/tools/csv-to-sql-inserts/component"), { loading: ToolSkeleton }),
  "cuid-generator": dynamic(() => import("@/tools/cuid-generator/component"), { loading: ToolSkeleton }),
  "curl-to-fetch": dynamic(() => import("@/tools/curl-to-fetch/component"), { loading: ToolSkeleton }),
  "curl-to-go-http": dynamic(() => import("@/tools/curl-to-go-http/component"), { loading: ToolSkeleton }),
  "curl-to-node-axios": dynamic(() => import("@/tools/curl-to-node-axios/component"), { loading: ToolSkeleton }),
  "curl-to-php-curl": dynamic(() => import("@/tools/curl-to-php-curl/component"), { loading: ToolSkeleton }),
  "curl-to-python-requests": dynamic(() => import("@/tools/curl-to-python-requests/component"), { loading: ToolSkeleton }),
  "date-to-unix-timestamp": dynamic(() => import("@/tools/date-to-unix-timestamp/component"), { loading: ToolSkeleton }),
  "dns-record-generator": dynamic(() => import("@/tools/dns-record-generator/component"), { loading: ToolSkeleton }),
  "dockerfile-generator": dynamic(() => import("@/tools/dockerfile-generator/component"), { loading: ToolSkeleton }),
  "duplicate-line-remover": dynamic(() => import("@/tools/duplicate-line-remover/component"), { loading: ToolSkeleton }),
  "email-extractor": dynamic(() => import("@/tools/email-extractor/component"), { loading: ToolSkeleton }),
  "email-subject-line-tester": dynamic(() => import("@/tools/email-subject-line-tester/component"), { loading: ToolSkeleton }),
  "energy-power-converter": dynamic(() => import("@/tools/energy-power-converter/component"), { loading: ToolSkeleton }),
  "env-to-json-converter": dynamic(() => import("@/tools/env-to-json-converter/component"), { loading: ToolSkeleton }),
  "factorial-calculator": dynamic(() => import("@/tools/factorial-calculator/component"), { loading: ToolSkeleton }),
  "faq-schema-generator": dynamic(() => import("@/tools/faq-schema-generator/component"), { loading: ToolSkeleton }),
  "find-and-replace": dynamic(() => import("@/tools/find-and-replace/component"), { loading: ToolSkeleton }),
  "floating-point-converter": dynamic(() => import("@/tools/floating-point-converter/component"), { loading: ToolSkeleton }),
  "fraction-calculator": dynamic(() => import("@/tools/fraction-calculator/component"), { loading: ToolSkeleton }),
  "gcd-lcm-calculator": dynamic(() => import("@/tools/gcd-lcm-calculator/component"), { loading: ToolSkeleton }),
  "gitignore-generator": dynamic(() => import("@/tools/gitignore-generator/component"), { loading: ToolSkeleton }),
  "graphql-query-prettifier": dynamic(() => import("@/tools/graphql-query-prettifier/component"), { loading: ToolSkeleton }),
  "hash-comparator": dynamic(() => import("@/tools/hash-comparator/component"), { loading: ToolSkeleton }),
  "hash-generator": dynamic(() => import("@/tools/hash-generator/component"), { loading: ToolSkeleton }),
  "headline-analyzer": dynamic(() => import("@/tools/headline-analyzer/component"), { loading: ToolSkeleton }),
  "hex-color-code-extractor": dynamic(() => import("@/tools/hex-color-code-extractor/component"), { loading: ToolSkeleton }),
  "hex-to-ascii": dynamic(() => import("@/tools/hex-to-ascii/component"), { loading: ToolSkeleton }),
  "hex-to-rgb": dynamic(() => import("@/tools/hex-to-rgb/component"), { loading: ToolSkeleton }),
  "hmac-generator": dynamic(() => import("@/tools/hmac-generator/component"), { loading: ToolSkeleton }),
  "how-to-schema-generator": dynamic(() => import("@/tools/how-to-schema-generator/component"), { loading: ToolSkeleton }),
  "html-color-picker": dynamic(() => import("@/tools/html-color-picker/component"), { loading: ToolSkeleton }),
  "html-entity-decoder": dynamic(() => import("@/tools/html-entity-decoder/component"), { loading: ToolSkeleton }),
  "html-entity-encoder": dynamic(() => import("@/tools/html-entity-encoder/component"), { loading: ToolSkeleton }),
  "html-formatter": dynamic(() => import("@/tools/html-formatter/component"), { loading: ToolSkeleton }),
  "html-minifier": dynamic(() => import("@/tools/html-minifier/component"), { loading: ToolSkeleton }),
  "html-table-to-json": dynamic(() => import("@/tools/html-table-to-json/component"), { loading: ToolSkeleton }),
  "html-to-markdown": dynamic(() => import("@/tools/html-to-markdown/component"), { loading: ToolSkeleton }),
  "htpasswd-generator": dynamic(() => import("@/tools/htpasswd-generator/component"), { loading: ToolSkeleton }),
  "http-header-analyzer": dynamic(() => import("@/tools/http-header-analyzer/component"), { loading: ToolSkeleton }),
  "http-headers-parser": dynamic(() => import("@/tools/http-headers-parser/component"), { loading: ToolSkeleton }),
  "http-status-code-lookup": dynamic(() => import("@/tools/http-status-code-lookup/component"), { loading: ToolSkeleton }),
  "image-compressor": dynamic(() => import("@/tools/image-compressor/component"), { loading: ToolSkeleton }),
  "image-to-base64": dynamic(() => import("@/tools/image-to-base64/component"), { loading: ToolSkeleton }),
  "invisible-character-detector": dynamic(() => import("@/tools/invisible-character-detector/component"), { loading: ToolSkeleton }),
  "ip-geolocation-lookup": dynamic(() => import("@/tools/ip-geolocation-lookup/component"), { loading: ToolSkeleton }),
  "ip-range-to-cidr": dynamic(() => import("@/tools/ip-range-to-cidr/component"), { loading: ToolSkeleton }),
  "ipv4-subnet-calculator": dynamic(() => import("@/tools/ipv4-subnet-calculator/component"), { loading: ToolSkeleton }),
  "ipv4-to-ipv6-converter": dynamic(() => import("@/tools/ipv4-to-ipv6-converter/component"), { loading: ToolSkeleton }),
  "js-formatter": dynamic(() => import("@/tools/js-formatter/component"), { loading: ToolSkeleton }),
  "js-minifier": dynamic(() => import("@/tools/js-minifier/component"), { loading: ToolSkeleton }),
  "js-obfuscation-detector": dynamic(() => import("@/tools/js-obfuscation-detector/component"), { loading: ToolSkeleton }),
  "json-formatter": dynamic(() => import("@/tools/json-formatter/component"), { loading: ToolSkeleton }),
  "json-key-sorter": dynamic(() => import("@/tools/json-key-sorter/component"), { loading: ToolSkeleton }),
  "json-ld-generator": dynamic(() => import("@/tools/json-ld-generator/component"), { loading: ToolSkeleton }),
  "json-minifier": dynamic(() => import("@/tools/json-minifier/component"), { loading: ToolSkeleton }),
  "json-schema-to-typescript": dynamic(() => import("@/tools/json-schema-to-typescript/component"), { loading: ToolSkeleton }),
  "json-size-analyzer": dynamic(() => import("@/tools/json-size-analyzer/component"), { loading: ToolSkeleton }),
  "json-to-csv": dynamic(() => import("@/tools/json-to-csv/component"), { loading: ToolSkeleton }),
  "json-to-go-struct": dynamic(() => import("@/tools/json-to-go-struct/component"), { loading: ToolSkeleton }),
  "json-to-graphql-schema": dynamic(() => import("@/tools/json-to-graphql-schema/component"), { loading: ToolSkeleton }),
  "json-to-json-schema": dynamic(() => import("@/tools/json-to-json-schema/component"), { loading: ToolSkeleton }),
  "json-to-kotlin": dynamic(() => import("@/tools/json-to-kotlin/component"), { loading: ToolSkeleton }),
  "json-to-properties": dynamic(() => import("@/tools/json-to-properties/component"), { loading: ToolSkeleton }),
  "json-to-python-pydantic": dynamic(() => import("@/tools/json-to-python-pydantic/component"), { loading: ToolSkeleton }),
  "json-to-rust-serde": dynamic(() => import("@/tools/json-to-rust-serde/component"), { loading: ToolSkeleton }),
  "json-to-sql-schema": dynamic(() => import("@/tools/json-to-sql-schema/component"), { loading: ToolSkeleton }),
  "json-to-toml": dynamic(() => import("@/tools/json-to-toml/component"), { loading: ToolSkeleton }),
  "json-to-typescript": dynamic(() => import("@/tools/json-to-typescript/component"), { loading: ToolSkeleton }),
  "json-to-xml": dynamic(() => import("@/tools/json-to-xml/component"), { loading: ToolSkeleton }),
  "json-to-xml-schema-xsd": dynamic(() => import("@/tools/json-to-xml-schema-xsd/component"), { loading: ToolSkeleton }),
  "json-to-yaml": dynamic(() => import("@/tools/json-to-yaml/component"), { loading: ToolSkeleton }),
  "json-to-zod": dynamic(() => import("@/tools/json-to-zod/component"), { loading: ToolSkeleton }),
  "json-validator": dynamic(() => import("@/tools/json-validator/component"), { loading: ToolSkeleton }),
  "jsonpath-evaluator": dynamic(() => import("@/tools/jsonpath-evaluator/component"), { loading: ToolSkeleton }),
  "jwt-builder": dynamic(() => import("@/tools/jwt-builder/component"), { loading: ToolSkeleton }),
  "jwt-decoder": dynamic(() => import("@/tools/jwt-decoder/component"), { loading: ToolSkeleton }),
  "jwt-generator": dynamic(() => import("@/tools/jwt-generator/component"), { loading: ToolSkeleton }),
  "keyword-density-analyzer": dynamic(() => import("@/tools/keyword-density-analyzer/component"), { loading: ToolSkeleton }),
  "license-text-generator": dynamic(() => import("@/tools/license-text-generator/component"), { loading: ToolSkeleton }),
  "line-counter": dynamic(() => import("@/tools/line-counter/component"), { loading: ToolSkeleton }),
  "line-numberer": dynamic(() => import("@/tools/line-numberer/component"), { loading: ToolSkeleton }),
  "list-randomizer": dynamic(() => import("@/tools/list-randomizer/component"), { loading: ToolSkeleton }),
  "lorem-ipsum-generator": dynamic(() => import("@/tools/lorem-ipsum-generator/component"), { loading: ToolSkeleton }),
  "mac-address-formatter": dynamic(() => import("@/tools/mac-address-formatter/component"), { loading: ToolSkeleton }),
  "markdown-heading-extractor": dynamic(() => import("@/tools/markdown-heading-extractor/component"), { loading: ToolSkeleton }),
  "markdown-previewer": dynamic(() => import("@/tools/markdown-previewer/component"), { loading: ToolSkeleton }),
  "markdown-table-to-csv": dynamic(() => import("@/tools/markdown-table-to-csv/component"), { loading: ToolSkeleton }),
  "markdown-to-html": dynamic(() => import("@/tools/markdown-to-html/component"), { loading: ToolSkeleton }),
  "markdown-to-pdf": dynamic(() => import("@/tools/markdown-to-pdf/component"), { loading: ToolSkeleton }),
  "markdown-to-pdf-cleaner": dynamic(() => import("@/tools/markdown-to-pdf-cleaner/component"), { loading: ToolSkeleton }),
  "matrix-calculator": dynamic(() => import("@/tools/matrix-calculator/component"), { loading: ToolSkeleton }),
  "md5-hash-generator": dynamic(() => import("@/tools/md5-hash-generator/component"), { loading: ToolSkeleton }),
  "meta-description-previewer": dynamic(() => import("@/tools/meta-description-previewer/component"), { loading: ToolSkeleton }),
  "meta-robots-tag-generator": dynamic(() => import("@/tools/meta-robots-tag-generator/component"), { loading: ToolSkeleton }),
  "meta-tag-generator": dynamic(() => import("@/tools/meta-tag-generator/component"), { loading: ToolSkeleton }),
  "mime-type-lookup": dynamic(() => import("@/tools/mime-type-lookup/component"), { loading: ToolSkeleton }),
  "modulo-inverse-calculator": dynamic(() => import("@/tools/modulo-inverse-calculator/component"), { loading: ToolSkeleton }),
  "morse-code-converter": dynamic(() => import("@/tools/morse-code-converter/component"), { loading: ToolSkeleton }),
  "nanoid-generator": dynamic(() => import("@/tools/nanoid-generator/component"), { loading: ToolSkeleton }),
  "ndjson-to-json": dynamic(() => import("@/tools/ndjson-to-json/component"), { loading: ToolSkeleton }),
  "nginx-config-generator": dynamic(() => import("@/tools/nginx-config-generator/component"), { loading: ToolSkeleton }),
  "number-base-converter": dynamic(() => import("@/tools/number-base-converter/component"), { loading: ToolSkeleton }),
  "number-to-words": dynamic(() => import("@/tools/number-to-words/component"), { loading: ToolSkeleton }),
  "open-graph-meta-generator": dynamic(() => import("@/tools/open-graph-meta-generator/component"), { loading: ToolSkeleton }),
  "package-json-validator": dynamic(() => import("@/tools/package-json-validator/component"), { loading: ToolSkeleton }),
  "palette-generator": dynamic(() => import("@/tools/palette-generator/component"), { loading: ToolSkeleton }),
  "passive-to-active-voice-detector": dynamic(() => import("@/tools/passive-to-active-voice-detector/component"), { loading: ToolSkeleton }),
  "password-generator": dynamic(() => import("@/tools/password-generator/component"), { loading: ToolSkeleton }),
  "password-strength-checker": dynamic(() => import("@/tools/password-strength-checker/component"), { loading: ToolSkeleton }),
  "percentage-calculator": dynamic(() => import("@/tools/percentage-calculator/component"), { loading: ToolSkeleton }),
  "prefix-suffix-adder": dynamic(() => import("@/tools/prefix-suffix-adder/component"), { loading: ToolSkeleton }),
  "pressure-unit-converter": dynamic(() => import("@/tools/pressure-unit-converter/component"), { loading: ToolSkeleton }),
  "prime-number-checker": dynamic(() => import("@/tools/prime-number-checker/component"), { loading: ToolSkeleton }),
  "properties-to-json": dynamic(() => import("@/tools/properties-to-json/component"), { loading: ToolSkeleton }),
  "protobuf-to-json": dynamic(() => import("@/tools/protobuf-to-json/component"), { loading: ToolSkeleton }),
  "punycode-converter": dynamic(() => import("@/tools/punycode-converter/component"), { loading: ToolSkeleton }),
  "px-to-rem-converter": dynamic(() => import("@/tools/px-to-rem-converter/component"), { loading: ToolSkeleton }),
  "qr-code-generator": dynamic(() => import("@/tools/qr-code-generator/component"), { loading: ToolSkeleton }),
  "query-string-parser": dynamic(() => import("@/tools/query-string-parser/component"), { loading: ToolSkeleton }),
  "random-number-generator": dynamic(() => import("@/tools/random-number-generator/component"), { loading: ToolSkeleton }),
  "read-time-calculator": dynamic(() => import("@/tools/read-time-calculator/component"), { loading: ToolSkeleton }),
  "reading-grade-level-calculator": dynamic(() => import("@/tools/reading-grade-level-calculator/component"), { loading: ToolSkeleton }),
  "readme-badge-generator": dynamic(() => import("@/tools/readme-badge-generator/component"), { loading: ToolSkeleton }),
  "redirect-rule-generator": dynamic(() => import("@/tools/redirect-rule-generator/component"), { loading: ToolSkeleton }),
  "regex-cheatsheet-tester": dynamic(() => import("@/tools/regex-cheatsheet-tester/component"), { loading: ToolSkeleton }),
  "regex-tester": dynamic(() => import("@/tools/regex-tester/component"), { loading: ToolSkeleton }),
  "rgb-to-hex": dynamic(() => import("@/tools/rgb-to-hex/component"), { loading: ToolSkeleton }),
  "ripemd160-generator": dynamic(() => import("@/tools/ripemd160-generator/component"), { loading: ToolSkeleton }),
  "robots-txt-generator": dynamic(() => import("@/tools/robots-txt-generator/component"), { loading: ToolSkeleton }),
  "roman-numeral-converter": dynamic(() => import("@/tools/roman-numeral-converter/component"), { loading: ToolSkeleton }),
  "rot13-converter": dynamic(() => import("@/tools/rot13-converter/component"), { loading: ToolSkeleton }),
  "rsa-key-generator": dynamic(() => import("@/tools/rsa-key-generator/component"), { loading: ToolSkeleton }),
  "sales-tax-vat-calculator": dynamic(() => import("@/tools/sales-tax-vat-calculator/component"), { loading: ToolSkeleton }),
  "scientific-notation-converter": dynamic(() => import("@/tools/scientific-notation-converter/component"), { loading: ToolSkeleton }),
  "screen-ppi-calculator": dynamic(() => import("@/tools/screen-ppi-calculator/component"), { loading: ToolSkeleton }),
  "semver-comparator": dynamic(() => import("@/tools/semver-comparator/component"), { loading: ToolSkeleton }),
  "sha3-hash-generator": dynamic(() => import("@/tools/sha3-hash-generator/component"), { loading: ToolSkeleton }),
  "sha512-hash-generator": dynamic(() => import("@/tools/sha512-hash-generator/component"), { loading: ToolSkeleton }),
  "sitemap-url-extractor": dynamic(() => import("@/tools/sitemap-url-extractor/component"), { loading: ToolSkeleton }),
  "social-media-post-formatter": dynamic(() => import("@/tools/social-media-post-formatter/component"), { loading: ToolSkeleton }),
  "social-share-url-generator": dynamic(() => import("@/tools/social-share-url-generator/component"), { loading: ToolSkeleton }),
  "speed-distance-time-calculator": dynamic(() => import("@/tools/speed-distance-time-calculator/component"), { loading: ToolSkeleton }),
  "sql-formatter": dynamic(() => import("@/tools/sql-formatter/component"), { loading: ToolSkeleton }),
  "sql-query-explainer": dynamic(() => import("@/tools/sql-query-explainer/component"), { loading: ToolSkeleton }),
  "sql-query-minifier": dynamic(() => import("@/tools/sql-query-minifier/component"), { loading: ToolSkeleton }),
  "statistics-calculator": dynamic(() => import("@/tools/statistics-calculator/component"), { loading: ToolSkeleton }),
  "string-escape": dynamic(() => import("@/tools/string-escape/component"), { loading: ToolSkeleton }),
  "string-unescape": dynamic(() => import("@/tools/string-unescape/component"), { loading: ToolSkeleton }),
  "svg-optimizer": dynamic(() => import("@/tools/svg-optimizer/component"), { loading: ToolSkeleton }),
  "svg-path-visualizer": dynamic(() => import("@/tools/svg-path-visualizer/component"), { loading: ToolSkeleton }),
  "svg-to-css-data-uri": dynamic(() => import("@/tools/svg-to-css-data-uri/component"), { loading: ToolSkeleton }),
  "svg-to-jsx": dynamic(() => import("@/tools/svg-to-jsx/component"), { loading: ToolSkeleton }),
  "temperature-converter": dynamic(() => import("@/tools/temperature-converter/component"), { loading: ToolSkeleton }),
  "text-case": dynamic(() => import("@/tools/text-case/component"), { loading: ToolSkeleton }),
  "text-cliche-finder": dynamic(() => import("@/tools/text-cliche-finder/component"), { loading: ToolSkeleton }),
  "text-diff-checker": dynamic(() => import("@/tools/text-diff-checker/component"), { loading: ToolSkeleton }),
  "text-indent-formatter": dynamic(() => import("@/tools/text-indent-formatter/component"), { loading: ToolSkeleton }),
  "text-reverser": dynamic(() => import("@/tools/text-reverser/component"), { loading: ToolSkeleton }),
  "text-sentiment-analyzer": dynamic(() => import("@/tools/text-sentiment-analyzer/component"), { loading: ToolSkeleton }),
  "text-sorter": dynamic(() => import("@/tools/text-sorter/component"), { loading: ToolSkeleton }),
  "text-to-binary": dynamic(() => import("@/tools/text-to-binary/component"), { loading: ToolSkeleton }),
  "text-trimmer": dynamic(() => import("@/tools/text-trimmer/component"), { loading: ToolSkeleton }),
  "text-word-wrap": dynamic(() => import("@/tools/text-word-wrap/component"), { loading: ToolSkeleton }),
  "time-duration-calculator": dynamic(() => import("@/tools/time-duration-calculator/component"), { loading: ToolSkeleton }),
  "timestamp-to-iso": dynamic(() => import("@/tools/timestamp-to-iso/component"), { loading: ToolSkeleton }),
  "toml-to-json": dynamic(() => import("@/tools/toml-to-json/component"), { loading: ToolSkeleton }),
  "tsv-to-csv": dynamic(() => import("@/tools/tsv-to-csv/component"), { loading: ToolSkeleton }),
  "twitter-tweet-counter": dynamic(() => import("@/tools/twitter-tweet-counter/component"), { loading: ToolSkeleton }),
  "typescript-playground": dynamic(() => import("@/tools/typescript-playground/component"), { loading: ToolSkeleton }),
  "ulid-generator": dynamic(() => import("@/tools/ulid-generator/component"), { loading: ToolSkeleton }),
  "unicode-escape-converter": dynamic(() => import("@/tools/unicode-escape-converter/component"), { loading: ToolSkeleton }),
  "unix-timestamp-converter": dynamic(() => import("@/tools/unix-timestamp-converter/component"), { loading: ToolSkeleton }),
  "url-encoder-decoder": dynamic(() => import("@/tools/url-encoder-decoder/component"), { loading: ToolSkeleton }),
  "url-extractor": dynamic(() => import("@/tools/url-extractor/component"), { loading: ToolSkeleton }),
  "url-parser": dynamic(() => import("@/tools/url-parser/component"), { loading: ToolSkeleton }),
  "url-slug-generator": dynamic(() => import("@/tools/url-slug-generator/component"), { loading: ToolSkeleton }),
  "user-agent-parser": dynamic(() => import("@/tools/user-agent-parser/component"), { loading: ToolSkeleton }),
  "user-snippet-generator": dynamic(() => import("@/tools/user-snippet-generator/component"), { loading: ToolSkeleton }),
  "utm-builder": dynamic(() => import("@/tools/utm-builder/component"), { loading: ToolSkeleton }),
  "uuid-generator": dynamic(() => import("@/tools/uuid-generator/component"), { loading: ToolSkeleton }),
  "websocket-frame-analyzer": dynamic(() => import("@/tools/websocket-frame-analyzer/component"), { loading: ToolSkeleton }),
  "whitespace-remover": dynamic(() => import("@/tools/whitespace-remover/component"), { loading: ToolSkeleton }),
  "whois-domain-parser": dynamic(() => import("@/tools/whois-domain-parser/component"), { loading: ToolSkeleton }),
  "word-counter": dynamic(() => import("@/tools/word-counter/component"), { loading: ToolSkeleton }),
  "xml-formatter": dynamic(() => import("@/tools/xml-formatter/component"), { loading: ToolSkeleton }),
  "xml-minifier": dynamic(() => import("@/tools/xml-minifier/component"), { loading: ToolSkeleton }),
  "xml-to-json": dynamic(() => import("@/tools/xml-to-json/component"), { loading: ToolSkeleton }),
  "yaml-to-json": dynamic(() => import("@/tools/yaml-to-json/component"), { loading: ToolSkeleton }),
};

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getRelatedTools(slug: string, limit = 3): ToolDefinition[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tools
    .filter((t) => t.category === tool.category && t.slug !== slug)
    .slice(0, limit);
}
