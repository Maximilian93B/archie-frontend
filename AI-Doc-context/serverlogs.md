2025-07-05 00:34:02.772 | {"time":"2025-07-05T07:34:02.771644858Z","level":"INFO","msg":"Starting Archivus DMS","environment":"development","port":"8080"}
2025-07-05 00:34:02.772 | {"time":"2025-07-05T07:34:02.771940033Z","level":"INFO","msg":"Connecting to database","url":"postgresql://postgres:Y5HK4_.D5Cc7v.y@db.ulnisgaeijkspqambdlh.supabase.co:5432/postgres"}
2025-07-05 00:34:03.294 | 
2025-07-05 00:34:03.294 | 2025/07/05 07:34:03 /app/internal/infrastructure/database/database.go:99
2025-07-05 00:34:03.294 | [102.990ms] [rows:0] CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
2025-07-05 00:34:03.398 | 
2025-07-05 00:34:03.398 | 2025/07/05 07:34:03 /app/internal/infrastructure/database/database.go:99
2025-07-05 00:34:03.398 | [104.255ms] [rows:0] CREATE EXTENSION IF NOT EXISTS "vector"
2025-07-05 00:34:03.450 | {"time":"2025-07-05T07:34:03.450076419Z","level":"INFO","msg":"Running database migrations..."}
2025-07-05 00:34:03.549 | 
2025-07-05 00:34:03.549 | 2025/07/05 07:34:03 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:03.549 | [94.829ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND table_type = 'BASE TABLE'
2025-07-05 00:34:03.642 | 
2025-07-05 00:34:03.642 | 2025/07/05 07:34:03 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:03.642 | [92.763ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:03.747 | 
2025-07-05 00:34:03.747 | 2025/07/05 07:34:03 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:03.747 | [104.450ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'tenants'
2025-07-05 00:34:03.844 | 
2025-07-05 00:34:03.844 | 2025/07/05 07:34:03 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:03.844 | [96.490ms] [rows:-] SELECT * FROM "tenants" LIMIT 1
2025-07-05 00:34:03.955 | 
2025-07-05 00:34:03.955 | 2025/07/05 07:34:03 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:03.955 | [110.948ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'tenants' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:04.063 | 
2025-07-05 00:34:04.063 | 2025/07/05 07:34:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:04.063 | [107.860ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'tenants'
2025-07-05 00:34:04.157 | 
2025-07-05 00:34:04.157 | 2025/07/05 07:34:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:04.157 | [94.026ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:04.157 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:04.157 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:04.157 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:04.157 | 		AND b.relname = 'tenants'
2025-07-05 00:34:04.254 | 
2025-07-05 00:34:04.254 | 2025/07/05 07:34:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:04.254 | [97.301ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:04.302 | 
2025-07-05 00:34:04.302 | 2025/07/05 07:34:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:04.302 | [47.482ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:04.350 | 
2025-07-05 00:34:04.350 | 2025/07/05 07:34:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:04.350 | [47.834ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'subdomain') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:04.399 | 
2025-07-05 00:34:04.399 | 2025/07/05 07:34:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:04.399 | [48.897ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'subscription_tier') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:04.447 | 
2025-07-05 00:34:04.447 | 2025/07/05 07:34:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:04.447 | [48.172ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'storage_quota') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:04.501 | 
2025-07-05 00:34:04.501 | 2025/07/05 07:34:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:04.501 | [53.709ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'storage_used') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:04.547 | 
2025-07-05 00:34:04.547 | 2025/07/05 07:34:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:04.547 | [46.361ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'api_quota') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:04.593 | 
2025-07-05 00:34:04.593 | 2025/07/05 07:34:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:04.593 | [45.805ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'api_used') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:04.641 | 
2025-07-05 00:34:04.641 | 2025/07/05 07:34:04 
2025-07-05 00:34:04.641 | [47.999ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:04.694 | 
2025-07-05 00:34:04.694 | 2025/07/05 07:34:04 
2025-07-05 00:34:04.694 | [52.745ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'tenants'
2025-07-05 00:34:04.745 | 
2025-07-05 00:34:04.745 | 2025/07/05 07:34:04 
2025-07-05 00:34:04.745 | [50.443ms] [rows:-] SELECT * FROM "tenants" LIMIT 1
2025-07-05 00:34:04.810 | 
2025-07-05 00:34:04.810 | 2025/07/05 07:34:04 
2025-07-05 00:34:04.810 | [65.004ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'tenants' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:04.871 | 
2025-07-05 00:34:04.871 | 2025/07/05 07:34:04 
2025-07-05 00:34:04.871 | [60.688ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'tenants'
2025-07-05 00:34:04.918 | 
2025-07-05 00:34:04.918 | 2025/07/05 07:34:04 
2025-07-05 00:34:04.918 | [46.954ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:04.918 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:04.918 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:04.918 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:04.918 | 		AND b.relname = 'tenants'
2025-07-05 00:34:05.021 | 
2025-07-05 00:34:05.021 | 2025/07/05 07:34:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:05.021 | [103.393ms] [rows:0] ALTER TABLE "tenants" ALTER COLUMN "settings" SET DEFAULT '{}'
2025-07-05 00:34:05.641 | 
2025-07-05 00:34:05.641 | 2025/07/05 07:34:05 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:05.641 | [619.400ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'settings') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:05.689 | 
2025-07-05 00:34:05.689 | 2025/07/05 07:34:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:05.689 | [47.749ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'is_active') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:05.737 | 
2025-07-05 00:34:05.737 | 2025/07/05 07:34:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:05.737 | [48.132ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'trial_ends_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:05.785 | 
2025-07-05 00:34:05.785 | 2025/07/05 07:34:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:05.785 | [48.414ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'business_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:05.833 | 
2025-07-05 00:34:05.833 | 2025/07/05 07:34:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:05.833 | [47.375ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'industry') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:05.881 | 
2025-07-05 00:34:05.881 | 2025/07/05 07:34:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:05.881 | [48.269ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'company_size') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:05.927 | 
2025-07-05 00:34:05.927 | 2025/07/05 07:34:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:05.927 | [45.972ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'tax_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:05.974 | 
2025-07-05 00:34:05.974 | 2025/07/05 07:34:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:05.974 | [46.191ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'address') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:06.020 | 
2025-07-05 00:34:06.020 | 2025/07/05 07:34:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:06.020 | [45.912ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'retention_policy') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:06.066 | 
2025-07-05 00:34:06.066 | 2025/07/05 07:34:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:06.066 | [46.197ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'compliance_rules') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:06.113 | 
2025-07-05 00:34:06.113 | 2025/07/05 07:34:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:06.113 | [46.409ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:06.158 | 
2025-07-05 00:34:06.158 | 2025/07/05 07:34:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:06.158 | [45.737ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:06.256 | 
2025-07-05 00:34:06.257 | 2025/07/05 07:34:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:06.257 | [97.745ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND table_type = 'BASE TABLE'
2025-07-05 00:34:06.353 | 
2025-07-05 00:34:06.353 | 2025/07/05 07:34:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:06.353 | [96.741ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:06.456 | 
2025-07-05 00:34:06.457 | 2025/07/05 07:34:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:06.457 | [103.153ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'users'
2025-07-05 00:34:06.554 | 
2025-07-05 00:34:06.554 | 2025/07/05 07:34:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:06.554 | [96.016ms] [rows:-] SELECT * FROM "users" LIMIT 1
2025-07-05 00:34:06.658 | 
2025-07-05 00:34:06.658 | 2025/07/05 07:34:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:06.658 | [103.741ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'users' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:06.773 | 
2025-07-05 00:34:06.773 | 2025/07/05 07:34:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:06.773 | [114.995ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'users'
2025-07-05 00:34:06.869 | 
2025-07-05 00:34:06.869 | 2025/07/05 07:34:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:06.869 | [96.671ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:06.869 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:06.869 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:06.869 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:06.869 | 		AND b.relname = 'users'
2025-07-05 00:34:06.917 | 
2025-07-05 00:34:06.917 | 2025/07/05 07:34:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:06.917 | [47.290ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:06.969 | 
2025-07-05 00:34:06.969 | 2025/07/05 07:34:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:06.969 | [52.068ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:07.015 | 
2025-07-05 00:34:07.015 | 2025/07/05 07:34:07 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:07.015 | [46.209ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'email') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:07.062 | 
2025-07-05 00:34:07.062 | 2025/07/05 07:34:07 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:07.062 | [46.664ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'password_hash') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:07.109 | 
2025-07-05 00:34:07.109 | 2025/07/05 07:34:07 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:07.109 | [47.183ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'first_name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:07.156 | 
2025-07-05 00:34:07.156 | 2025/07/05 07:34:07 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:07.156 | [46.610ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'last_name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:07.203 | 
2025-07-05 00:34:07.203 | 2025/07/05 07:34:07 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:07.203 | [46.358ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'role') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:07.249 | 
2025-07-05 00:34:07.249 | 2025/07/05 07:34:07 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:07.249 | [46.821ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'department') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:07.296 | 
2025-07-05 00:34:07.296 | 2025/07/05 07:34:07 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:07.296 | [46.739ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'job_title') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:07.346 | 
2025-07-05 00:34:07.346 | 2025/07/05 07:34:07 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:07.346 | [49.341ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'is_active') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:07.392 | 
2025-07-05 00:34:07.392 | 2025/07/05 07:34:07 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:07.392 | [46.130ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'email_verified') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:07.443 | 
2025-07-05 00:34:07.443 | 2025/07/05 07:34:07 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:07.443 | [50.825ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'last_login_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:07.490 | 
2025-07-05 00:34:07.490 | 2025/07/05 07:34:07 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:07.490 | [46.939ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'password_changed_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:07.537 | 
2025-07-05 00:34:07.537 | 2025/07/05 07:34:07 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:07.537 | [46.538ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'mfa_enabled') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:07.582 | 
2025-07-05 00:34:07.582 | 2025/07/05 07:34:07 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:07.582 | [45.847ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'mfa_secret') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:07.629 | 
2025-07-05 00:34:07.629 | 2025/07/05 07:34:07 
2025-07-05 00:34:07.629 | [46.811ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:07.683 | 
2025-07-05 00:34:07.683 | 2025/07/05 07:34:07 
2025-07-05 00:34:07.683 | [53.203ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'users'
2025-07-05 00:34:07.733 | 
2025-07-05 00:34:07.733 | 2025/07/05 07:34:07 
2025-07-05 00:34:07.733 | [49.728ms] [rows:-] SELECT * FROM "users" LIMIT 1
2025-07-05 00:34:07.793 | 
2025-07-05 00:34:07.793 | 2025/07/05 07:34:07 
2025-07-05 00:34:07.793 | [60.177ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'users' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:07.856 | 
2025-07-05 00:34:07.856 | 2025/07/05 07:34:07 
2025-07-05 00:34:07.856 | [63.110ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'users'
2025-07-05 00:34:07.902 | 
2025-07-05 00:34:07.902 | 2025/07/05 07:34:07 
2025-07-05 00:34:07.902 | [45.716ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:07.902 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:07.902 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:07.902 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:07.902 | 		AND b.relname = 'users'
2025-07-05 00:34:08.003 | 
2025-07-05 00:34:08.003 | 2025/07/05 07:34:08 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:08.003 | [101.106ms] [rows:0] ALTER TABLE "users" ALTER COLUMN "preferences" SET DEFAULT '{}'
2025-07-05 00:34:08.515 | 
2025-07-05 00:34:08.515 | 2025/07/05 07:34:08 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:08.515 | [511.475ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'preferences') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:08.608 | 
2025-07-05 00:34:08.608 | 2025/07/05 07:34:08 
2025-07-05 00:34:08.608 | [93.282ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:08.707 | 
2025-07-05 00:34:08.707 | 2025/07/05 07:34:08 
2025-07-05 00:34:08.707 | [99.176ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'users'
2025-07-05 00:34:08.806 | 
2025-07-05 00:34:08.806 | 2025/07/05 07:34:08 
2025-07-05 00:34:08.806 | [98.495ms] [rows:-] SELECT * FROM "users" LIMIT 1
2025-07-05 00:34:08.913 | 
2025-07-05 00:34:08.913 | 2025/07/05 07:34:08 
2025-07-05 00:34:08.913 | [106.533ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'users' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:09.018 | 
2025-07-05 00:34:09.018 | 2025/07/05 07:34:09 
2025-07-05 00:34:09.018 | [105.304ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'users'
2025-07-05 00:34:09.112 | 
2025-07-05 00:34:09.112 | 2025/07/05 07:34:09 
2025-07-05 00:34:09.112 | [93.656ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:09.112 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:09.112 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:09.112 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:09.112 | 		AND b.relname = 'users'
2025-07-05 00:34:09.211 | 
2025-07-05 00:34:09.211 | 2025/07/05 07:34:09 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:09.211 | [98.686ms] [rows:0] ALTER TABLE "users" ALTER COLUMN "notification_settings" SET DEFAULT '{}'
2025-07-05 00:34:09.682 | 
2025-07-05 00:34:09.682 | 2025/07/05 07:34:09 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:09.682 | [470.657ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'notification_settings') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:09.731 | 
2025-07-05 00:34:09.731 | 2025/07/05 07:34:09 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:09.731 | [48.918ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:09.782 | 
2025-07-05 00:34:09.782 | 2025/07/05 07:34:09 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:09.782 | [50.978ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:09.884 | 
2025-07-05 00:34:09.885 | 2025/07/05 07:34:09 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:09.885 | [102.502ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND constraint_name = 'fk_tenants_users'
2025-07-05 00:34:09.980 | 
2025-07-05 00:34:09.981 | 2025/07/05 07:34:09 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:09.981 | [95.958ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'users' AND indexname = 'idx_users_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:10.028 | 
2025-07-05 00:34:10.028 | 2025/07/05 07:34:10 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:10.028 | [47.062ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'users' AND indexname = 'idx_users_email' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:10.122 | 
2025-07-05 00:34:10.122 | 2025/07/05 07:34:10 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:10.122 | [93.873ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND table_type = 'BASE TABLE'
2025-07-05 00:34:10.215 | 
2025-07-05 00:34:10.215 | 2025/07/05 07:34:10 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:10.215 | [93.049ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:10.315 | 
2025-07-05 00:34:10.315 | 2025/07/05 07:34:10 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:10.315 | [100.220ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'folders'
2025-07-05 00:34:10.414 | 
2025-07-05 00:34:10.414 | 2025/07/05 07:34:10 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:10.414 | [98.795ms] [rows:-] SELECT * FROM "folders" LIMIT 1
2025-07-05 00:34:10.514 | 
2025-07-05 00:34:10.514 | 2025/07/05 07:34:10 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:10.514 | [99.929ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'folders' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:10.616 | 
2025-07-05 00:34:10.616 | 2025/07/05 07:34:10 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:10.616 | [101.461ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'folders'
2025-07-05 00:34:10.710 | 
2025-07-05 00:34:10.710 | 2025/07/05 07:34:10 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:10.710 | [93.986ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:10.710 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:10.710 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:10.710 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:10.710 | 		AND b.relname = 'folders'
2025-07-05 00:34:10.758 | 
2025-07-05 00:34:10.758 | 2025/07/05 07:34:10 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:10.758 | [48.316ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:10.807 | 
2025-07-05 00:34:10.807 | 2025/07/05 07:34:10 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:10.807 | [48.714ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:10.855 | 
2025-07-05 00:34:10.855 | 2025/07/05 07:34:10 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:10.855 | [48.119ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'parent_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:10.904 | 
2025-07-05 00:34:10.904 | 2025/07/05 07:34:10 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:10.904 | [47.994ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:10.951 | 
2025-07-05 00:34:10.951 | 2025/07/05 07:34:10 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:10.951 | [47.470ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'description') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:10.998 | 
2025-07-05 00:34:10.998 | 2025/07/05 07:34:10 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:10.998 | [47.226ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'path') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:11.048 | 
2025-07-05 00:34:11.048 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.049 | [50.018ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'level') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:11.095 | 
2025-07-05 00:34:11.095 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.095 | [46.659ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'is_system') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:11.142 | 
2025-07-05 00:34:11.142 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.142 | [46.950ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'color') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:11.189 | 
2025-07-05 00:34:11.189 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.189 | [46.785ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'icon') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:11.236 | 
2025-07-05 00:34:11.236 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.236 | [46.515ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'created_by') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:11.283 | 
2025-07-05 00:34:11.283 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.283 | [46.753ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:11.336 | 
2025-07-05 00:34:11.336 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.336 | [52.662ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:11.384 | 
2025-07-05 00:34:11.384 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.384 | [48.071ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND constraint_name = 'fk_users_created_folders'
2025-07-05 00:34:11.431 | 
2025-07-05 00:34:11.431 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.431 | [47.456ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND constraint_name = 'fk_tenants_folders'
2025-07-05 00:34:11.478 | 
2025-07-05 00:34:11.478 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.478 | [47.020ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND constraint_name = 'fk_folders_children'
2025-07-05 00:34:11.529 | 
2025-07-05 00:34:11.530 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.530 | [51.004ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'folders' AND indexname = 'idx_tenant_folder_path' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:11.581 | 
2025-07-05 00:34:11.581 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.581 | [51.235ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'folders' AND indexname = 'idx_folders_parent_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:11.628 | 
2025-07-05 00:34:11.628 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.628 | [46.922ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'folders' AND indexname = 'idx_folders_created_by' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:11.675 | 
2025-07-05 00:34:11.676 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.676 | [47.470ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND table_type = 'BASE TABLE'
2025-07-05 00:34:11.722 | 
2025-07-05 00:34:11.722 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.722 | [46.346ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:11.775 | 
2025-07-05 00:34:11.775 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.775 | [52.587ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'categories'
2025-07-05 00:34:11.874 | 
2025-07-05 00:34:11.874 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.874 | [98.988ms] [rows:-] SELECT * FROM "categories" LIMIT 1
2025-07-05 00:34:11.926 | 
2025-07-05 00:34:11.926 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.926 | [51.890ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'categories' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:11.979 | 
2025-07-05 00:34:11.979 | 2025/07/05 07:34:11 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:11.979 | [52.711ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'categories'
2025-07-05 00:34:12.026 | 
2025-07-05 00:34:12.026 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.026 | [47.331ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:12.026 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:12.026 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:12.026 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:12.026 | 		AND b.relname = 'categories'
2025-07-05 00:34:12.073 | 
2025-07-05 00:34:12.073 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.073 | [46.753ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:12.120 | 
2025-07-05 00:34:12.120 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.120 | [47.030ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:12.167 | 
2025-07-05 00:34:12.167 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.167 | [46.435ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:12.214 | 
2025-07-05 00:34:12.214 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.214 | [46.891ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'description') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:12.261 | 
2025-07-05 00:34:12.261 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.261 | [47.026ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'color') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:12.310 | 
2025-07-05 00:34:12.310 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.310 | [49.392ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'icon') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:12.357 | 
2025-07-05 00:34:12.357 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.357 | [46.866ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'is_system') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:12.405 | 
2025-07-05 00:34:12.405 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.405 | [47.832ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'sort_order') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:12.452 | 
2025-07-05 00:34:12.452 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.452 | [46.454ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:12.501 | 
2025-07-05 00:34:12.501 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.501 | [48.938ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND constraint_name = 'fk_tenants_categories'
2025-07-05 00:34:12.548 | 
2025-07-05 00:34:12.549 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.549 | [47.530ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'categories' AND indexname = 'idx_categories_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:12.595 | 
2025-07-05 00:34:12.595 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.595 | [46.514ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'categories' AND indexname = 'idx_tenant_category_name' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:12.643 | 
2025-07-05 00:34:12.643 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.643 | [47.631ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND table_type = 'BASE TABLE'
2025-07-05 00:34:12.691 | 
2025-07-05 00:34:12.691 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.691 | [48.258ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:12.750 | 
2025-07-05 00:34:12.750 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.750 | [58.586ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-05 00:34:12.855 | 
2025-07-05 00:34:12.855 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.855 | [105.274ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-05 00:34:12.956 | 
2025-07-05 00:34:12.956 | 2025/07/05 07:34:12 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:12.956 | [100.457ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:13.053 | 
2025-07-05 00:34:13.053 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.053 | [96.402ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-05 00:34:13.100 | 
2025-07-05 00:34:13.100 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.100 | [47.707ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:13.100 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:13.100 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:13.100 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:13.100 | 		AND b.relname = 'documents'
2025-07-05 00:34:13.151 | 
2025-07-05 00:34:13.151 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.151 | [50.117ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:13.197 | 
2025-07-05 00:34:13.197 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.197 | [46.613ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:13.248 | 
2025-07-05 00:34:13.248 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.248 | [50.597ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'folder_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:13.294 | 
2025-07-05 00:34:13.294 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.294 | [46.298ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'file_name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:13.341 | 
2025-07-05 00:34:13.341 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.341 | [46.833ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'original_name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:13.389 | 
2025-07-05 00:34:13.389 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.389 | [46.923ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'content_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:13.439 | 
2025-07-05 00:34:13.439 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.439 | [49.589ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'file_size') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:13.488 | 
2025-07-05 00:34:13.488 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.488 | [48.305ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'storage_path') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:13.534 | 
2025-07-05 00:34:13.534 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.534 | [46.313ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'thumbnail_path') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:13.581 | 
2025-07-05 00:34:13.581 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.581 | [47.114ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'preview_path') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:13.631 | 
2025-07-05 00:34:13.631 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.631 | [49.524ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'extracted_text') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:13.677 | 
2025-07-05 00:34:13.677 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.677 | [46.630ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'content_hash') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:13.724 | 
2025-07-05 00:34:13.724 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.724 | [46.762ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'ocr_text') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:13.771 | 
2025-07-05 00:34:13.772 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.772 | [47.004ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'summary') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:13.820 | 
2025-07-05 00:34:13.820 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.820 | [48.532ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'ai_confidence') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:13.868 | 
2025-07-05 00:34:13.868 | 2025/07/05 07:34:13 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:13.868 | [48.011ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'embedding') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:13.914 | 
2025-07-05 00:34:13.915 | 2025/07/05 07:34:13 
2025-07-05 00:34:13.915 | [46.336ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:13.976 | 
2025-07-05 00:34:13.976 | 2025/07/05 07:34:13 
2025-07-05 00:34:13.976 | [61.328ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-05 00:34:14.025 | 
2025-07-05 00:34:14.025 | 2025/07/05 07:34:14 
2025-07-05 00:34:14.025 | [49.081ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-05 00:34:14.125 | 
2025-07-05 00:34:14.125 | 2025/07/05 07:34:14 
2025-07-05 00:34:14.125 | [99.154ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:14.221 | 
2025-07-05 00:34:14.221 | 2025/07/05 07:34:14 
2025-07-05 00:34:14.221 | [95.877ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-05 00:34:14.268 | 
2025-07-05 00:34:14.268 | 2025/07/05 07:34:14 
2025-07-05 00:34:14.268 | [47.229ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:14.268 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:14.268 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:14.268 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:14.268 | 		AND b.relname = 'documents'
2025-07-05 00:34:14.941 | 
2025-07-05 00:34:14.941 | 2025/07/05 07:34:14 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:14.941 | [672.938ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'normalized_text') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:14.990 | 
2025-07-05 00:34:14.990 | 2025/07/05 07:34:14 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:14.990 | [49.044ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_extraction_status') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:15.090 | 
2025-07-05 00:34:15.090 | 2025/07/05 07:34:15 
2025-07-05 00:34:15.090 | [99.357ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:15.197 | 
2025-07-05 00:34:15.198 | 2025/07/05 07:34:15 
2025-07-05 00:34:15.198 | [107.655ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-05 00:34:15.302 | 
2025-07-05 00:34:15.302 | 2025/07/05 07:34:15 
2025-07-05 00:34:15.302 | [104.244ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-05 00:34:15.447 | 
2025-07-05 00:34:15.447 | 2025/07/05 07:34:15 
2025-07-05 00:34:15.447 | [144.935ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:15.589 | 
2025-07-05 00:34:15.589 | 2025/07/05 07:34:15 
2025-07-05 00:34:15.589 | [141.831ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-05 00:34:15.689 | 
2025-07-05 00:34:15.690 | 2025/07/05 07:34:15 
2025-07-05 00:34:15.690 | [100.336ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:15.690 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:15.690 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:15.690 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:15.690 | 		AND b.relname = 'documents'
2025-07-05 00:34:16.127 | 
2025-07-05 00:34:16.127 | 2025/07/05 07:34:16 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:16.127 | [436.942ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_extraction_error') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:16.220 | 
2025-07-05 00:34:16.220 | 2025/07/05 07:34:16 
2025-07-05 00:34:16.220 | [93.409ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:16.329 | 
2025-07-05 00:34:16.329 | 2025/07/05 07:34:16 
2025-07-05 00:34:16.329 | [109.240ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-05 00:34:16.428 | 
2025-07-05 00:34:16.428 | 2025/07/05 07:34:16 
2025-07-05 00:34:16.428 | [97.804ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-05 00:34:16.571 | 
2025-07-05 00:34:16.571 | 2025/07/05 07:34:16 
2025-07-05 00:34:16.571 | [142.930ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:16.716 | 
2025-07-05 00:34:16.716 | 2025/07/05 07:34:16 
2025-07-05 00:34:16.716 | [144.954ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-05 00:34:16.810 | 
2025-07-05 00:34:16.810 | 2025/07/05 07:34:16 
2025-07-05 00:34:16.810 | [94.361ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:16.810 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:16.810 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:16.810 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:16.810 | 		AND b.relname = 'documents'
2025-07-05 00:34:16.917 | 
2025-07-05 00:34:16.917 | 2025/07/05 07:34:16 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:16.917 | [106.707ms] [rows:0] ALTER TABLE "documents" ALTER COLUMN "text_extraction_method" TYPE varchar(20) USING "text_extraction_method"::varchar(20)
2025-07-05 00:34:17.390 | 
2025-07-05 00:34:17.390 | 2025/07/05 07:34:17 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:17.390 | [472.775ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_extraction_method') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:17.484 | 
2025-07-05 00:34:17.484 | 2025/07/05 07:34:17 
2025-07-05 00:34:17.484 | [93.969ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:17.589 | 
2025-07-05 00:34:17.589 | 2025/07/05 07:34:17 
2025-07-05 00:34:17.589 | [105.048ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-05 00:34:17.693 | 
2025-07-05 00:34:17.693 | 2025/07/05 07:34:17 
2025-07-05 00:34:17.693 | [103.255ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-05 00:34:17.838 | 
2025-07-05 00:34:17.838 | 2025/07/05 07:34:17 
2025-07-05 00:34:17.838 | [145.509ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:17.981 | 
2025-07-05 00:34:17.981 | 2025/07/05 07:34:17 
2025-07-05 00:34:17.981 | [142.353ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-05 00:34:18.075 | 
2025-07-05 00:34:18.075 | 2025/07/05 07:34:18 
2025-07-05 00:34:18.075 | [94.343ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:18.075 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:18.075 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:18.075 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:18.075 | 		AND b.relname = 'documents'
2025-07-05 00:34:18.507 | 
2025-07-05 00:34:18.507 | 2025/07/05 07:34:18 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:18.507 | [431.282ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_quality') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:18.601 | 
2025-07-05 00:34:18.601 | 2025/07/05 07:34:18 
2025-07-05 00:34:18.601 | [94.263ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:18.706 | 
2025-07-05 00:34:18.706 | 2025/07/05 07:34:18 
2025-07-05 00:34:18.706 | [105.000ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-05 00:34:18.808 | 
2025-07-05 00:34:18.808 | 2025/07/05 07:34:18 
2025-07-05 00:34:18.808 | [101.674ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-05 00:34:18.955 | 
2025-07-05 00:34:18.955 | 2025/07/05 07:34:18 
2025-07-05 00:34:18.955 | [146.409ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:19.098 | 
2025-07-05 00:34:19.098 | 2025/07/05 07:34:19 
2025-07-05 00:34:19.098 | [143.260ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-05 00:34:19.197 | 
2025-07-05 00:34:19.197 | 2025/07/05 07:34:19 
2025-07-05 00:34:19.197 | [98.411ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:19.197 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:19.197 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:19.197 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:19.197 | 		AND b.relname = 'documents'
2025-07-05 00:34:19.296 | 
2025-07-05 00:34:19.296 | 2025/07/05 07:34:19 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:19.296 | [99.079ms] [rows:0] ALTER TABLE "documents" ALTER COLUMN "text_language" TYPE varchar(10) USING "text_language"::varchar(10)
2025-07-05 00:34:19.774 | 
2025-07-05 00:34:19.774 | 2025/07/05 07:34:19 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:19.774 | [478.155ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_language') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:19.869 | 
2025-07-05 00:34:19.869 | 2025/07/05 07:34:19 
2025-07-05 00:34:19.869 | [94.565ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:19.973 | 
2025-07-05 00:34:19.973 | 2025/07/05 07:34:19 
2025-07-05 00:34:19.973 | [103.717ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-05 00:34:20.071 | 
2025-07-05 00:34:20.071 | 2025/07/05 07:34:20 
2025-07-05 00:34:20.072 | [98.503ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-05 00:34:20.214 | 
2025-07-05 00:34:20.214 | 2025/07/05 07:34:20 
2025-07-05 00:34:20.214 | [142.620ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:20.356 | 
2025-07-05 00:34:20.356 | 2025/07/05 07:34:20 
2025-07-05 00:34:20.356 | [141.161ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-05 00:34:20.451 | 
2025-07-05 00:34:20.451 | 2025/07/05 07:34:20 
2025-07-05 00:34:20.451 | [95.344ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:20.451 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:20.451 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:20.451 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:20.451 | 		AND b.relname = 'documents'
2025-07-05 00:34:20.882 | 
2025-07-05 00:34:20.882 | 2025/07/05 07:34:20 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:20.882 | [430.636ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_word_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:20.976 | 
2025-07-05 00:34:20.976 | 2025/07/05 07:34:20 
2025-07-05 00:34:20.976 | [93.883ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:21.080 | 
2025-07-05 00:34:21.080 | 2025/07/05 07:34:21 
2025-07-05 00:34:21.080 | [104.577ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-05 00:34:21.182 | 
2025-07-05 00:34:21.182 | 2025/07/05 07:34:21 
2025-07-05 00:34:21.182 | [101.252ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-05 00:34:21.328 | 
2025-07-05 00:34:21.328 | 2025/07/05 07:34:21 
2025-07-05 00:34:21.328 | [145.536ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:21.470 | 
2025-07-05 00:34:21.470 | 2025/07/05 07:34:21 
2025-07-05 00:34:21.470 | [141.679ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-05 00:34:21.565 | 
2025-07-05 00:34:21.565 | 2025/07/05 07:34:21 
2025-07-05 00:34:21.565 | [94.559ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:21.565 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:21.565 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:21.565 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:21.565 | 		AND b.relname = 'documents'
2025-07-05 00:34:22.666 | 
2025-07-05 00:34:22.666 | 2025/07/05 07:34:22 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:22.666 | [427.077ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_char_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:23.487 | 
2025-07-05 00:34:23.487 | 2025/07/05 07:34:23 
2025-07-05 00:34:23.487 | [93.861ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:23.589 | 
2025-07-05 00:34:23.589 | 2025/07/05 07:34:23 
2025-07-05 00:34:23.589 | [102.556ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-05 00:34:23.692 | 
2025-07-05 00:34:23.692 | 2025/07/05 07:34:23 
2025-07-05 00:34:23.692 | [102.386ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-05 00:34:23.838 | 
2025-07-05 00:34:23.838 | 2025/07/05 07:34:23 
2025-07-05 00:34:23.838 | [145.522ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:23.987 | 
2025-07-05 00:34:23.987 | 2025/07/05 07:34:23 
2025-07-05 00:34:23.987 | [148.991ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-05 00:34:24.081 | 
2025-07-05 00:34:24.081 | 2025/07/05 07:34:24 
2025-07-05 00:34:24.081 | [94.365ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:24.081 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:24.081 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:24.081 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:24.081 | 		AND b.relname = 'documents'
2025-07-05 00:34:24.508 | 
2025-07-05 00:34:24.508 | 2025/07/05 07:34:24 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:24.508 | [426.937ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_extraction_time_ms') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:24.609 | 
2025-07-05 00:34:24.609 | 2025/07/05 07:34:24 
2025-07-05 00:34:24.609 | [100.687ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:24.721 | 
2025-07-05 00:34:24.721 | 2025/07/05 07:34:24 
2025-07-05 00:34:24.721 | [111.278ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-05 00:34:24.824 | 
2025-07-05 00:34:24.824 | 2025/07/05 07:34:24 
2025-07-05 00:34:24.824 | [103.257ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-05 00:34:24.969 | 
2025-07-05 00:34:24.969 | 2025/07/05 07:34:24 
2025-07-05 00:34:24.969 | [144.681ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:25.116 | 
2025-07-05 00:34:25.116 | 2025/07/05 07:34:25 
2025-07-05 00:34:25.116 | [147.211ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-05 00:34:25.212 | 
2025-07-05 00:34:25.212 | 2025/07/05 07:34:25 
2025-07-05 00:34:25.212 | [95.621ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:25.212 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:25.212 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:25.212 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:25.212 | 		AND b.relname = 'documents'
2025-07-05 00:34:25.642 | 
2025-07-05 00:34:25.642 | 2025/07/05 07:34:25 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:25.642 | [429.348ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_extracted_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:25.735 | 
2025-07-05 00:34:25.735 | 2025/07/05 07:34:25 
2025-07-05 00:34:25.735 | [93.368ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:25.840 | 
2025-07-05 00:34:25.840 | 2025/07/05 07:34:25 
2025-07-05 00:34:25.840 | [104.629ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-05 00:34:25.941 | 
2025-07-05 00:34:25.942 | 2025/07/05 07:34:25 
2025-07-05 00:34:25.942 | [101.402ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-05 00:34:26.087 | 
2025-07-05 00:34:26.087 | 2025/07/05 07:34:26 
2025-07-05 00:34:26.087 | [145.790ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:26.230 | 
2025-07-05 00:34:26.230 | 2025/07/05 07:34:26 
2025-07-05 00:34:26.230 | [142.441ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-05 00:34:26.323 | 
2025-07-05 00:34:26.323 | 2025/07/05 07:34:26 
2025-07-05 00:34:26.323 | [92.972ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:26.323 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:26.323 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:26.323 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:26.323 | 		AND b.relname = 'documents'
2025-07-05 00:34:26.754 | 
2025-07-05 00:34:26.754 | 2025/07/05 07:34:26 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:26.754 | [431.024ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'ai_summary') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:26.849 | 
2025-07-05 00:34:26.849 | 2025/07/05 07:34:26 
2025-07-05 00:34:26.849 | [94.499ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:26.952 | 
2025-07-05 00:34:26.952 | 2025/07/05 07:34:26 
2025-07-05 00:34:26.952 | [103.131ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-05 00:34:27.054 | 
2025-07-05 00:34:27.054 | 2025/07/05 07:34:27 
2025-07-05 00:34:27.054 | [101.406ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-05 00:34:27.201 | 
2025-07-05 00:34:27.202 | 2025/07/05 07:34:27 
2025-07-05 00:34:27.202 | [147.717ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:27.345 | 
2025-07-05 00:34:27.345 | 2025/07/05 07:34:27 
2025-07-05 00:34:27.345 | [142.900ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-05 00:34:27.441 | 
2025-07-05 00:34:27.441 | 2025/07/05 07:34:27 
2025-07-05 00:34:27.441 | [96.628ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:27.441 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:27.441 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:27.441 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:27.441 | 		AND b.relname = 'documents'
2025-07-05 00:34:27.876 | 
2025-07-05 00:34:27.876 | 2025/07/05 07:34:27 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:27.876 | [434.881ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'ai_key_points') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:27.970 | 
2025-07-05 00:34:27.970 | 2025/07/05 07:34:27 
2025-07-05 00:34:27.970 | [93.883ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:28.075 | 
2025-07-05 00:34:28.075 | 2025/07/05 07:34:28 
2025-07-05 00:34:28.075 | [104.543ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-05 00:34:28.175 | 
2025-07-05 00:34:28.175 | 2025/07/05 07:34:28 
2025-07-05 00:34:28.175 | [99.333ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-05 00:34:28.321 | 
2025-07-05 00:34:28.321 | 2025/07/05 07:34:28 
2025-07-05 00:34:28.321 | [146.733ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:28.465 | 
2025-07-05 00:34:28.465 | 2025/07/05 07:34:28 
2025-07-05 00:34:28.465 | [143.030ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-05 00:34:28.565 | 
2025-07-05 00:34:28.565 | 2025/07/05 07:34:28 
2025-07-05 00:34:28.565 | [99.941ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:28.565 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:28.565 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:28.565 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:28.565 | 		AND b.relname = 'documents'
2025-07-05 00:34:28.995 | 
2025-07-05 00:34:28.995 | 2025/07/05 07:34:28 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:28.995 | [429.790ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'ai_entities') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:29.089 | 
2025-07-05 00:34:29.089 | 2025/07/05 07:34:29 
2025-07-05 00:34:29.089 | [93.833ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:29.193 | 
2025-07-05 00:34:29.193 | 2025/07/05 07:34:29 
2025-07-05 00:34:29.193 | [103.914ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-05 00:34:29.295 | 
2025-07-05 00:34:29.295 | 2025/07/05 07:34:29 
2025-07-05 00:34:29.295 | [101.891ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-05 00:34:29.444 | 
2025-07-05 00:34:29.444 | 2025/07/05 07:34:29 
2025-07-05 00:34:29.444 | [149.377ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:29.591 | 
2025-07-05 00:34:29.591 | 2025/07/05 07:34:29 
2025-07-05 00:34:29.591 | [146.244ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-05 00:34:29.685 | 
2025-07-05 00:34:29.685 | 2025/07/05 07:34:29 
2025-07-05 00:34:29.685 | [94.101ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:29.685 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:29.685 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:29.685 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:29.685 | 		AND b.relname = 'documents'
2025-07-05 00:34:30.131 | 
2025-07-05 00:34:30.131 | 2025/07/05 07:34:30 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:30.131 | [445.538ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'ai_categories') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:30.229 | 
2025-07-05 00:34:30.229 | 2025/07/05 07:34:30 
2025-07-05 00:34:30.229 | [98.429ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:30.337 | 
2025-07-05 00:34:30.337 | 2025/07/05 07:34:30 
2025-07-05 00:34:30.337 | [107.650ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-05 00:34:30.439 | 
2025-07-05 00:34:30.439 | 2025/07/05 07:34:30 
2025-07-05 00:34:30.439 | [102.019ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-05 00:34:30.589 | 
2025-07-05 00:34:30.589 | 2025/07/05 07:34:30 
2025-07-05 00:34:30.589 | [149.595ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:30.733 | 
2025-07-05 00:34:30.733 | 2025/07/05 07:34:30 
2025-07-05 00:34:30.733 | [144.365ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-05 00:34:30.828 | 
2025-07-05 00:34:30.828 | 2025/07/05 07:34:30 
2025-07-05 00:34:30.828 | [94.033ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:30.828 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:30.828 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:30.828 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:30.828 | 		AND b.relname = 'documents'
2025-07-05 00:34:31.256 | 
2025-07-05 00:34:31.256 | 2025/07/05 07:34:31 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:31.256 | [428.638ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'ai_confidence_score') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:31.311 | 
2025-07-05 00:34:31.311 | 2025/07/05 07:34:31 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:31.311 | [54.682ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'a_iprocessed_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:31.360 | 
2025-07-05 00:34:31.360 | 2025/07/05 07:34:31 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:31.360 | [48.493ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'title') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:31.408 | 
2025-07-05 00:34:31.408 | 2025/07/05 07:34:31 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:31.408 | [47.968ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'description') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:31.461 | 
2025-07-05 00:34:31.461 | 2025/07/05 07:34:31 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:31.461 | [52.809ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'document_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:31.510 | 
2025-07-05 00:34:31.510 | 2025/07/05 07:34:31 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:31.510 | [49.324ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'status') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:31.559 | 
2025-07-05 00:34:31.559 | 2025/07/05 07:34:31 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:31.559 | [48.514ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'version') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:31.606 | 
2025-07-05 00:34:31.606 | 2025/07/05 07:34:31 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:31.606 | [47.398ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'language') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:31.654 | 
2025-07-05 00:34:31.654 | 2025/07/05 07:34:31 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:31.654 | [47.707ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'document_number') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:31.702 | 
2025-07-05 00:34:31.702 | 2025/07/05 07:34:31 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:31.702 | [47.855ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'reference_number') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:31.750 | 
2025-07-05 00:34:31.750 | 2025/07/05 07:34:31 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:31.750 | [47.920ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'external_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:31.797 | 
2025-07-05 00:34:31.797 | 2025/07/05 07:34:31 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:31.797 | [46.839ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'amount') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:31.844 | 
2025-07-05 00:34:31.844 | 2025/07/05 07:34:31 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:31.844 | [46.882ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'currency') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:31.894 | 
2025-07-05 00:34:31.894 | 2025/07/05 07:34:31 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:31.894 | [49.977ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'tax_amount') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:31.941 | 
2025-07-05 00:34:31.941 | 2025/07/05 07:34:31 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:31.941 | [46.857ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'vendor_name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:31.989 | 
2025-07-05 00:34:31.989 | 2025/07/05 07:34:31 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:31.989 | [47.468ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'customer_name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.036 | 
2025-07-05 00:34:32.036 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.036 | [47.041ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'document_date') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.083 | 
2025-07-05 00:34:32.083 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.083 | [46.963ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'due_date') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.131 | 
2025-07-05 00:34:32.131 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.131 | [47.823ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'expiry_date') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.178 | 
2025-07-05 00:34:32.178 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.178 | [47.045ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'compliance_status') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.229 | 
2025-07-05 00:34:32.229 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.229 | [50.919ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'retention_date') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.276 | 
2025-07-05 00:34:32.276 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.276 | [47.330ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'legal_hold') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.324 | 
2025-07-05 00:34:32.324 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.324 | [47.343ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'extracted_data') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.371 | 
2025-07-05 00:34:32.371 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.371 | [47.093ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'custom_fields') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.419 | 
2025-07-05 00:34:32.419 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.419 | [47.515ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'created_by') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.466 | 
2025-07-05 00:34:32.466 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.466 | [47.023ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'updated_by') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.519 | 
2025-07-05 00:34:32.519 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.519 | [52.745ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.566 | 
2025-07-05 00:34:32.566 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.566 | [47.457ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.614 | 
2025-07-05 00:34:32.614 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.614 | [47.636ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'author') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.661 | 
2025-07-05 00:34:32.661 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.661 | [46.989ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'subject') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.708 | 
2025-07-05 00:34:32.708 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.708 | [46.576ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'keywords') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.757 | 
2025-07-05 00:34:32.757 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.757 | [49.173ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'document_created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.803 | 
2025-07-05 00:34:32.804 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.804 | [46.418ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'document_modified_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:32.897 | 
2025-07-05 00:34:32.897 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.897 | [93.715ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND constraint_name = 'fk_users_created_documents'
2025-07-05 00:34:32.945 | 
2025-07-05 00:34:32.945 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.945 | [47.911ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND constraint_name = 'fk_tenants_documents'
2025-07-05 00:34:32.993 | 
2025-07-05 00:34:32.993 | 2025/07/05 07:34:32 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:32.993 | [47.056ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND constraint_name = 'fk_users_updated_documents'
2025-07-05 00:34:33.040 | 
2025-07-05 00:34:33.040 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.040 | [47.324ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND constraint_name = 'fk_folders_documents'
2025-07-05 00:34:33.135 | 
2025-07-05 00:34:33.135 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.135 | [94.982ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:33.183 | 
2025-07-05 00:34:33.183 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.183 | [47.614ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_folder_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:33.232 | 
2025-07-05 00:34:33.232 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.232 | [48.687ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_content_hash' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:33.280 | 
2025-07-05 00:34:33.280 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.280 | [47.944ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_document_type' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:33.328 | 
2025-07-05 00:34:33.328 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.328 | [47.600ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_document_number' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:33.376 | 
2025-07-05 00:34:33.376 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.376 | [47.963ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_reference_number' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:33.422 | 
2025-07-05 00:34:33.423 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.423 | [46.596ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_external_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:33.472 | 
2025-07-05 00:34:33.472 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.472 | [49.080ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_vendor_name' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:33.519 | 
2025-07-05 00:34:33.519 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.519 | [46.618ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_customer_name' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:33.566 | 
2025-07-05 00:34:33.566 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.566 | [47.598ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_document_date' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:33.614 | 
2025-07-05 00:34:33.614 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.614 | [47.297ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_due_date' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:33.661 | 
2025-07-05 00:34:33.661 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.661 | [46.777ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_expiry_date' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:33.708 | 
2025-07-05 00:34:33.708 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.708 | [47.316ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_retention_date' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:33.757 | 
2025-07-05 00:34:33.757 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.757 | [48.089ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_created_by' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:33.811 | 
2025-07-05 00:34:33.811 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.811 | [54.425ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_updated_by' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:33.904 | 
2025-07-05 00:34:33.904 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.904 | [93.374ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_categories' AND table_type = 'BASE TABLE'
2025-07-05 00:34:33.997 | 
2025-07-05 00:34:33.997 | 2025/07/05 07:34:33 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:33.997 | [92.049ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:34.095 | 
2025-07-05 00:34:34.095 | 2025/07/05 07:34:34 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:34.095 | [98.750ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_categories'
2025-07-05 00:34:34.189 | 
2025-07-05 00:34:34.189 | 2025/07/05 07:34:34 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:34.189 | [93.227ms] [rows:-] SELECT * FROM "document_categories" LIMIT 1
2025-07-05 00:34:34.288 | 
2025-07-05 00:34:34.288 | 2025/07/05 07:34:34 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:34.288 | [99.338ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_categories' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:34.387 | 
2025-07-05 00:34:34.388 | 2025/07/05 07:34:34 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:34.388 | [99.115ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_categories'
2025-07-05 00:34:34.481 | 
2025-07-05 00:34:34.481 | 2025/07/05 07:34:34 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:34.481 | [93.389ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:34.481 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:34.481 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:34.481 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:34.481 | 		AND b.relname = 'document_categories'
2025-07-05 00:34:34.528 | 
2025-07-05 00:34:34.528 | 2025/07/05 07:34:34 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:34.528 | [47.179ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_categories' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:34.575 | 
2025-07-05 00:34:34.575 | 2025/07/05 07:34:34 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:34.575 | [46.292ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_categories' AND column_name = 'category_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:34.622 | 
2025-07-05 00:34:34.622 | 2025/07/05 07:34:34 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:34.622 | [47.695ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_categories' AND constraint_name = 'fk_document_categories_document'
2025-07-05 00:34:34.671 | 
2025-07-05 00:34:34.671 | 2025/07/05 07:34:34 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:34.671 | [48.150ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_categories' AND constraint_name = 'fk_document_categories_category'
2025-07-05 00:34:34.719 | 
2025-07-05 00:34:34.719 | 2025/07/05 07:34:34 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:34.719 | [48.454ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND table_type = 'BASE TABLE'
2025-07-05 00:34:34.766 | 
2025-07-05 00:34:34.766 | 2025/07/05 07:34:34 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:34.766 | [46.380ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:34.819 | 
2025-07-05 00:34:34.819 | 2025/07/05 07:34:34 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:34.819 | [53.296ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'tags'
2025-07-05 00:34:34.913 | 
2025-07-05 00:34:34.913 | 2025/07/05 07:34:34 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:34.913 | [93.432ms] [rows:-] SELECT * FROM "tags" LIMIT 1
2025-07-05 00:34:34.966 | 
2025-07-05 00:34:34.966 | 2025/07/05 07:34:34 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:34.966 | [52.840ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'tags' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:35.019 | 
2025-07-05 00:34:35.019 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.019 | [53.187ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'tags'
2025-07-05 00:34:35.066 | 
2025-07-05 00:34:35.066 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.066 | [46.901ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:35.066 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:35.066 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:35.066 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:35.066 | 		AND b.relname = 'tags'
2025-07-05 00:34:35.113 | 
2025-07-05 00:34:35.113 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.113 | [47.145ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:35.161 | 
2025-07-05 00:34:35.161 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.161 | [47.303ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:35.207 | 
2025-07-05 00:34:35.207 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.207 | [46.842ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND column_name = 'name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:35.255 | 
2025-07-05 00:34:35.255 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.255 | [47.086ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND column_name = 'color') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:35.303 | 
2025-07-05 00:34:35.303 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.303 | [48.551ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND column_name = 'is_ai_generated') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:35.350 | 
2025-07-05 00:34:35.350 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.350 | [46.261ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND column_name = 'usage_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:35.396 | 
2025-07-05 00:34:35.396 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.396 | [46.496ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:35.442 | 
2025-07-05 00:34:35.442 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.442 | [45.974ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND constraint_name = 'fk_tenants_tags'
2025-07-05 00:34:35.494 | 
2025-07-05 00:34:35.494 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.494 | [51.266ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'tags' AND indexname = 'idx_tags_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:35.544 | 
2025-07-05 00:34:35.544 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.544 | [50.447ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'tags' AND indexname = 'idx_tenant_tag_name' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:35.597 | 
2025-07-05 00:34:35.597 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.597 | [52.395ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_tags' AND table_type = 'BASE TABLE'
2025-07-05 00:34:35.645 | 
2025-07-05 00:34:35.645 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.645 | [47.941ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:35.697 | 
2025-07-05 00:34:35.697 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.697 | [52.019ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_tags'
2025-07-05 00:34:35.792 | 
2025-07-05 00:34:35.792 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.792 | [95.374ms] [rows:-] SELECT * FROM "document_tags" LIMIT 1
2025-07-05 00:34:35.845 | 
2025-07-05 00:34:35.845 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.845 | [52.975ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_tags' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:35.898 | 
2025-07-05 00:34:35.898 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.898 | [52.456ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_tags'
2025-07-05 00:34:35.946 | 
2025-07-05 00:34:35.946 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.946 | [47.595ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:35.946 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:35.946 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:35.946 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:35.946 | 		AND b.relname = 'document_tags'
2025-07-05 00:34:35.993 | 
2025-07-05 00:34:35.993 | 2025/07/05 07:34:35 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:35.993 | [47.475ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_tags' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:36.040 | 
2025-07-05 00:34:36.040 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.040 | [47.046ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_tags' AND column_name = 'tag_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:36.088 | 
2025-07-05 00:34:36.088 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.088 | [47.217ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_tags' AND constraint_name = 'fk_document_tags_document'
2025-07-05 00:34:36.135 | 
2025-07-05 00:34:36.135 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.135 | [47.104ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_tags' AND constraint_name = 'fk_document_tags_tag'
2025-07-05 00:34:36.184 | 
2025-07-05 00:34:36.184 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.184 | [48.699ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND table_type = 'BASE TABLE'
2025-07-05 00:34:36.240 | 
2025-07-05 00:34:36.240 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.240 | [56.440ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:36.293 | 
2025-07-05 00:34:36.293 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.293 | [52.474ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions'
2025-07-05 00:34:36.386 | 
2025-07-05 00:34:36.386 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.386 | [93.411ms] [rows:-] SELECT * FROM "document_versions" LIMIT 1
2025-07-05 00:34:36.440 | 
2025-07-05 00:34:36.440 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.440 | [53.158ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_versions' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:36.492 | 
2025-07-05 00:34:36.492 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.492 | [52.575ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_versions'
2025-07-05 00:34:36.539 | 
2025-07-05 00:34:36.540 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.540 | [47.080ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:36.540 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:36.540 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:36.540 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:36.540 | 		AND b.relname = 'document_versions'
2025-07-05 00:34:36.587 | 
2025-07-05 00:34:36.587 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.587 | [47.391ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:36.634 | 
2025-07-05 00:34:36.634 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.634 | [47.053ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:36.682 | 
2025-07-05 00:34:36.683 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.683 | [48.171ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'version_number') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:36.730 | 
2025-07-05 00:34:36.731 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.731 | [47.887ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'storage_path') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:36.777 | 
2025-07-05 00:34:36.778 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.778 | [47.039ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'file_size') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:36.824 | 
2025-07-05 00:34:36.825 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.825 | [46.769ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'content_hash') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:36.872 | 
2025-07-05 00:34:36.872 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.872 | [47.403ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'changes') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:36.919 | 
2025-07-05 00:34:36.919 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.919 | [46.975ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'created_by') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:36.967 | 
2025-07-05 00:34:36.967 | 2025/07/05 07:34:36 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:36.967 | [47.852ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:37.014 | 
2025-07-05 00:34:37.014 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.014 | [46.694ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND constraint_name = 'fk_document_versions_creator'
2025-07-05 00:34:37.061 | 
2025-07-05 00:34:37.061 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.061 | [47.536ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND constraint_name = 'fk_documents_versions'
2025-07-05 00:34:37.110 | 
2025-07-05 00:34:37.110 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.110 | [48.274ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_versions' AND indexname = 'idx_document_versions_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:37.158 | 
2025-07-05 00:34:37.158 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.158 | [47.904ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND table_type = 'BASE TABLE'
2025-07-05 00:34:37.205 | 
2025-07-05 00:34:37.205 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.205 | [47.259ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:37.257 | 
2025-07-05 00:34:37.257 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.257 | [51.874ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates'
2025-07-05 00:34:37.352 | 
2025-07-05 00:34:37.352 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.352 | [94.998ms] [rows:-] SELECT * FROM "document_templates" LIMIT 1
2025-07-05 00:34:37.404 | 
2025-07-05 00:34:37.404 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.404 | [51.659ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_templates' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:37.457 | 
2025-07-05 00:34:37.457 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.457 | [52.850ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_templates'
2025-07-05 00:34:37.506 | 
2025-07-05 00:34:37.507 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.507 | [49.348ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:37.507 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:37.507 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:37.507 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:37.507 | 		AND b.relname = 'document_templates'
2025-07-05 00:34:37.554 | 
2025-07-05 00:34:37.554 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.554 | [47.533ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:37.601 | 
2025-07-05 00:34:37.601 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.601 | [46.822ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:37.648 | 
2025-07-05 00:34:37.648 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.648 | [46.508ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:37.694 | 
2025-07-05 00:34:37.694 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.694 | [46.221ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'description') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:37.741 | 
2025-07-05 00:34:37.741 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.741 | [46.785ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'doc_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:37.789 | 
2025-07-05 00:34:37.789 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.789 | [48.280ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'template') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:37.837 | 
2025-07-05 00:34:37.837 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.837 | [47.659ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'is_active') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:37.889 | 
2025-07-05 00:34:37.889 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.889 | [51.523ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'created_by') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:37.936 | 
2025-07-05 00:34:37.936 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.936 | [47.546ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:37.984 | 
2025-07-05 00:34:37.984 | 2025/07/05 07:34:37 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:37.984 | [47.602ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:38.032 | 
2025-07-05 00:34:38.032 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.032 | [47.615ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND constraint_name = 'fk_document_templates_creator'
2025-07-05 00:34:38.079 | 
2025-07-05 00:34:38.079 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.079 | [47.474ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND constraint_name = 'fk_tenants_templates'
2025-07-05 00:34:38.127 | 
2025-07-05 00:34:38.127 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.127 | [47.400ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_templates' AND indexname = 'idx_document_templates_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:38.174 | 
2025-07-05 00:34:38.174 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.174 | [47.216ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND table_type = 'BASE TABLE'
2025-07-05 00:34:38.221 | 
2025-07-05 00:34:38.221 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.221 | [46.934ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:38.275 | 
2025-07-05 00:34:38.275 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.275 | [53.690ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments'
2025-07-05 00:34:38.370 | 
2025-07-05 00:34:38.370 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.370 | [94.939ms] [rows:-] SELECT * FROM "document_comments" LIMIT 1
2025-07-05 00:34:38.423 | 
2025-07-05 00:34:38.423 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.423 | [53.224ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_comments' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:38.476 | 
2025-07-05 00:34:38.476 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.476 | [52.879ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_comments'
2025-07-05 00:34:38.523 | 
2025-07-05 00:34:38.524 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.524 | [47.048ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:38.524 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:38.524 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:38.524 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:38.524 | 		AND b.relname = 'document_comments'
2025-07-05 00:34:38.571 | 
2025-07-05 00:34:38.571 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.571 | [47.222ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_comments' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:38.618 | 
2025-07-05 00:34:38.618 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.618 | [47.303ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_comments' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:38.666 | 
2025-07-05 00:34:38.666 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.666 | [47.179ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND column_name = 'user_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_comments' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:38.712 | 
2025-07-05 00:34:38.712 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.712 | [46.477ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND column_name = 'content') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_comments' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:38.759 | 
2025-07-05 00:34:38.759 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.759 | [46.939ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND column_name = 'is_resolved') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_comments' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:38.806 | 
2025-07-05 00:34:38.806 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.806 | [46.667ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_comments' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:38.855 | 
2025-07-05 00:34:38.855 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.855 | [48.647ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_comments' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:38.902 | 
2025-07-05 00:34:38.902 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.902 | [47.183ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND constraint_name = 'fk_document_comments_user'
2025-07-05 00:34:38.949 | 
2025-07-05 00:34:38.949 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.949 | [46.853ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND constraint_name = 'fk_documents_comments'
2025-07-05 00:34:38.996 | 
2025-07-05 00:34:38.996 | 2025/07/05 07:34:38 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:38.996 | [46.717ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_comments' AND indexname = 'idx_document_comments_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:39.043 | 
2025-07-05 00:34:39.043 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.043 | [46.939ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_comments' AND indexname = 'idx_document_comments_user_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:39.094 | 
2025-07-05 00:34:39.094 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.094 | [51.710ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND table_type = 'BASE TABLE'
2025-07-05 00:34:39.141 | 
2025-07-05 00:34:39.141 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.141 | [46.646ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:39.190 | 
2025-07-05 00:34:39.190 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.190 | [48.857ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings'
2025-07-05 00:34:39.284 | 
2025-07-05 00:34:39.284 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.284 | [93.692ms] [rows:-] SELECT * FROM "document_embeddings" LIMIT 1
2025-07-05 00:34:39.332 | 
2025-07-05 00:34:39.332 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.332 | [48.170ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_embeddings' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:39.387 | 
2025-07-05 00:34:39.387 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.387 | [54.986ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_embeddings'
2025-07-05 00:34:39.434 | 
2025-07-05 00:34:39.434 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.434 | [46.583ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:39.434 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:39.434 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:39.434 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:39.434 | 		AND b.relname = 'document_embeddings'
2025-07-05 00:34:39.481 | 
2025-07-05 00:34:39.481 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.481 | [46.657ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_embeddings' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:39.528 | 
2025-07-05 00:34:39.528 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.528 | [47.136ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_embeddings' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:39.580 | 
2025-07-05 00:34:39.580 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.580 | [52.222ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND column_name = 'embedding') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_embeddings' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:39.628 | 
2025-07-05 00:34:39.628 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.628 | [47.058ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND column_name = 'chunk_index') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_embeddings' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:39.675 | 
2025-07-05 00:34:39.675 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.675 | [47.346ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND column_name = 'chunk_content') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_embeddings' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:39.722 | 
2025-07-05 00:34:39.722 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.722 | [46.754ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND column_name = 'token_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_embeddings' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:39.770 | 
2025-07-05 00:34:39.770 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.770 | [47.684ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_embeddings' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:39.818 | 
2025-07-05 00:34:39.818 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.818 | [48.323ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND constraint_name = 'fk_documents_embeddings'
2025-07-05 00:34:39.865 | 
2025-07-05 00:34:39.865 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.865 | [47.208ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_embeddings' AND indexname = 'idx_document_embeddings_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:39.913 | 
2025-07-05 00:34:39.913 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.913 | [47.725ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND table_type = 'BASE TABLE'
2025-07-05 00:34:39.960 | 
2025-07-05 00:34:39.960 | 2025/07/05 07:34:39 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:39.960 | [46.699ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:40.011 | 
2025-07-05 00:34:40.011 | 2025/07/05 07:34:40 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:40.011 | [50.696ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions'
2025-07-05 00:34:40.105 | 
2025-07-05 00:34:40.105 | 2025/07/05 07:34:40 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:40.105 | [93.857ms] [rows:-] SELECT * FROM "document_chat_sessions" LIMIT 1
2025-07-05 00:34:40.157 | 
2025-07-05 00:34:40.157 | 2025/07/05 07:34:40 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:40.157 | [52.305ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_chat_sessions' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:40.206 | 
2025-07-05 00:34:40.206 | 2025/07/05 07:34:40 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:40.206 | [48.664ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_chat_sessions'
2025-07-05 00:34:40.253 | 
2025-07-05 00:34:40.254 | 2025/07/05 07:34:40 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:40.254 | [47.555ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:40.254 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:40.254 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:40.254 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:40.254 | 		AND b.relname = 'document_chat_sessions'
2025-07-05 00:34:40.306 | 
2025-07-05 00:34:40.306 | 2025/07/05 07:34:40 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:40.306 | [51.858ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:40.353 | 
2025-07-05 00:34:40.353 | 2025/07/05 07:34:40 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:40.353 | [46.921ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:40.400 | 
2025-07-05 00:34:40.400 | 2025/07/05 07:34:40 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:40.400 | [46.851ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'user_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:40.446 | 
2025-07-05 00:34:40.446 | 2025/07/05 07:34:40 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:40.446 | [46.461ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'session_name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:40.493 | 
2025-07-05 00:34:40.493 | 2025/07/05 07:34:40 
2025-07-05 00:34:40.493 | [47.172ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:40.542 | 
2025-07-05 00:34:40.543 | 2025/07/05 07:34:40 
2025-07-05 00:34:40.543 | [48.928ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions'
2025-07-05 00:34:40.590 | 
2025-07-05 00:34:40.590 | 2025/07/05 07:34:40 
2025-07-05 00:34:40.590 | [47.057ms] [rows:-] SELECT * FROM "document_chat_sessions" LIMIT 1
2025-07-05 00:34:40.642 | 
2025-07-05 00:34:40.642 | 2025/07/05 07:34:40 
2025-07-05 00:34:40.642 | [51.869ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_chat_sessions' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:40.689 | 
2025-07-05 00:34:40.689 | 2025/07/05 07:34:40 
2025-07-05 00:34:40.689 | [47.538ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_chat_sessions'
2025-07-05 00:34:40.740 | 
2025-07-05 00:34:40.740 | 2025/07/05 07:34:40 
2025-07-05 00:34:40.740 | [49.956ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:40.740 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:40.740 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:40.740 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:40.740 | 		AND b.relname = 'document_chat_sessions'
2025-07-05 00:34:40.840 | 
2025-07-05 00:34:40.840 | 2025/07/05 07:34:40 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:40.840 | [100.341ms] [rows:0] ALTER TABLE "document_chat_sessions" ALTER COLUMN "messages" SET DEFAULT '[]'
2025-07-05 00:34:41.783 | 
2025-07-05 00:34:41.783 | 2025/07/05 07:34:41 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:41.783 | [942.810ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'messages') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:41.877 | 
2025-07-05 00:34:41.877 | 2025/07/05 07:34:41 
2025-07-05 00:34:41.877 | [93.728ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:41.981 | 
2025-07-05 00:34:41.981 | 2025/07/05 07:34:41 
2025-07-05 00:34:41.981 | [103.947ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions'
2025-07-05 00:34:42.076 | 
2025-07-05 00:34:42.076 | 2025/07/05 07:34:42 
2025-07-05 00:34:42.076 | [94.798ms] [rows:-] SELECT * FROM "document_chat_sessions" LIMIT 1
2025-07-05 00:34:42.183 | 
2025-07-05 00:34:42.183 | 2025/07/05 07:34:42 
2025-07-05 00:34:42.183 | [107.520ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_chat_sessions' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:42.283 | 
2025-07-05 00:34:42.283 | 2025/07/05 07:34:42 
2025-07-05 00:34:42.283 | [99.162ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_chat_sessions'
2025-07-05 00:34:42.376 | 
2025-07-05 00:34:42.376 | 2025/07/05 07:34:42 
2025-07-05 00:34:42.376 | [93.807ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:42.376 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:42.376 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:42.376 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:42.376 | 		AND b.relname = 'document_chat_sessions'
2025-07-05 00:34:42.476 | 
2025-07-05 00:34:42.476 | 2025/07/05 07:34:42 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:42.476 | [99.279ms] [rows:0] ALTER TABLE "document_chat_sessions" ALTER COLUMN "context" SET DEFAULT '{}'
2025-07-05 00:34:42.946 | 
2025-07-05 00:34:42.946 | 2025/07/05 07:34:42 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:42.946 | [470.079ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'context') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:42.995 | 
2025-07-05 00:34:42.995 | 2025/07/05 07:34:42 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:42.995 | [48.628ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'is_active') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:43.044 | 
2025-07-05 00:34:43.044 | 2025/07/05 07:34:43 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:43.044 | [48.651ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'total_messages') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:43.092 | 
2025-07-05 00:34:43.092 | 2025/07/05 07:34:43 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:43.092 | [48.243ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'last_message_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:43.140 | 
2025-07-05 00:34:43.140 | 2025/07/05 07:34:43 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:43.140 | [48.132ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:43.189 | 
2025-07-05 00:34:43.189 | 2025/07/05 07:34:43 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:43.189 | [49.223ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:43.290 | 
2025-07-05 00:34:43.290 | 2025/07/05 07:34:43 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:43.290 | [100.766ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND constraint_name = 'fk_document_chat_sessions_user'
2025-07-05 00:34:43.338 | 
2025-07-05 00:34:43.338 | 2025/07/05 07:34:43 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:43.338 | [47.353ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND constraint_name = 'fk_documents_chat_sessions'
2025-07-05 00:34:43.432 | 
2025-07-05 00:34:43.432 | 2025/07/05 07:34:43 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:43.432 | [94.119ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_chat_sessions' AND indexname = 'idx_document_chat_sessions_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:43.482 | 
2025-07-05 00:34:43.482 | 2025/07/05 07:34:43 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:43.482 | [49.961ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_chat_sessions' AND indexname = 'idx_document_chat_sessions_user_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:43.576 | 
2025-07-05 00:34:43.577 | 2025/07/05 07:34:43 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:43.577 | [94.385ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND table_type = 'BASE TABLE'
2025-07-05 00:34:43.671 | 
2025-07-05 00:34:43.671 | 2025/07/05 07:34:43 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:43.671 | [94.527ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:43.772 | 
2025-07-05 00:34:43.772 | 2025/07/05 07:34:43 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:43.772 | [101.170ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships'
2025-07-05 00:34:43.867 | 
2025-07-05 00:34:43.867 | 2025/07/05 07:34:43 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:43.867 | [94.137ms] [rows:-] SELECT * FROM "document_relationships" LIMIT 1
2025-07-05 00:34:43.969 | 
2025-07-05 00:34:43.969 | 2025/07/05 07:34:43 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:43.969 | [101.717ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_relationships' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:44.068 | 
2025-07-05 00:34:44.068 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.068 | [99.478ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_relationships'
2025-07-05 00:34:44.161 | 
2025-07-05 00:34:44.161 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.161 | [93.212ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:44.161 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:44.161 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:44.161 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:44.161 | 		AND b.relname = 'document_relationships'
2025-07-05 00:34:44.208 | 
2025-07-05 00:34:44.209 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.209 | [46.974ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_relationships' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:44.255 | 
2025-07-05 00:34:44.255 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.255 | [46.814ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND column_name = 'source_document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_relationships' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:44.302 | 
2025-07-05 00:34:44.302 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.302 | [46.818ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND column_name = 'target_document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_relationships' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:44.349 | 
2025-07-05 00:34:44.349 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.349 | [46.938ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND column_name = 'relationship_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_relationships' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:44.396 | 
2025-07-05 00:34:44.396 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.396 | [46.922ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND column_name = 'confidence_score') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_relationships' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:44.444 | 
2025-07-05 00:34:44.444 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.444 | [47.687ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND column_name = 'description') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_relationships' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:44.491 | 
2025-07-05 00:34:44.491 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.491 | [46.832ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND column_name = 'detected_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_relationships' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:44.538 | 
2025-07-05 00:34:44.538 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.538 | [46.391ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_relationships' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:44.585 | 
2025-07-05 00:34:44.585 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.585 | [47.450ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND constraint_name = 'fk_document_relationships_source_document'
2025-07-05 00:34:44.634 | 
2025-07-05 00:34:44.634 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.634 | [48.261ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND constraint_name = 'fk_document_relationships_target_document'
2025-07-05 00:34:44.682 | 
2025-07-05 00:34:44.682 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.682 | [47.609ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_relationships' AND indexname = 'idx_document_relationships_source_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:44.730 | 
2025-07-05 00:34:44.730 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.730 | [48.366ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_relationships' AND indexname = 'idx_document_relationships_target_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:44.777 | 
2025-07-05 00:34:44.777 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.778 | [47.321ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND table_type = 'BASE TABLE'
2025-07-05 00:34:44.824 | 
2025-07-05 00:34:44.824 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.824 | [46.469ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:44.877 | 
2025-07-05 00:34:44.877 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.877 | [52.515ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses'
2025-07-05 00:34:44.981 | 
2025-07-05 00:34:44.981 | 2025/07/05 07:34:44 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:44.981 | [104.197ms] [rows:-] SELECT * FROM "multi_document_analyses" LIMIT 1
2025-07-05 00:34:45.034 | 
2025-07-05 00:34:45.034 | 2025/07/05 07:34:45 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:45.034 | [53.180ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'multi_document_analyses' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:45.087 | 
2025-07-05 00:34:45.087 | 2025/07/05 07:34:45 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:45.087 | [52.306ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'multi_document_analyses'
2025-07-05 00:34:45.134 | 
2025-07-05 00:34:45.134 | 2025/07/05 07:34:45 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:45.134 | [47.478ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:45.134 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:45.134 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:45.134 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:45.134 | 		AND b.relname = 'multi_document_analyses'
2025-07-05 00:34:45.182 | 
2025-07-05 00:34:45.182 | 2025/07/05 07:34:45 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:45.182 | [47.240ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:45.228 | 
2025-07-05 00:34:45.228 | 2025/07/05 07:34:45 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:45.228 | [46.362ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'user_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:45.275 | 
2025-07-05 00:34:45.275 | 2025/07/05 07:34:45 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:45.275 | [46.763ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:45.322 | 
2025-07-05 00:34:45.322 | 2025/07/05 07:34:45 
2025-07-05 00:34:45.322 | [46.723ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:45.375 | 
2025-07-05 00:34:45.375 | 2025/07/05 07:34:45 
2025-07-05 00:34:45.375 | [52.634ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses'
2025-07-05 00:34:45.421 | 
2025-07-05 00:34:45.421 | 2025/07/05 07:34:45 
2025-07-05 00:34:45.421 | [46.311ms] [rows:-] SELECT * FROM "multi_document_analyses" LIMIT 1
2025-07-05 00:34:45.473 | 
2025-07-05 00:34:45.473 | 2025/07/05 07:34:45 
2025-07-05 00:34:45.473 | [52.292ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'multi_document_analyses' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:45.526 | 
2025-07-05 00:34:45.526 | 2025/07/05 07:34:45 
2025-07-05 00:34:45.526 | [52.244ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'multi_document_analyses'
2025-07-05 00:34:45.573 | 
2025-07-05 00:34:45.573 | 2025/07/05 07:34:45 
2025-07-05 00:34:45.573 | [46.883ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:45.573 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:45.573 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:45.573 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:45.573 | 		AND b.relname = 'multi_document_analyses'
2025-07-05 00:34:46.193 | 
2025-07-05 00:34:46.193 | 2025/07/05 07:34:46 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:46.194 | [620.452ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'document_ids') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:46.243 | 
2025-07-05 00:34:46.243 | 2025/07/05 07:34:46 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:46.243 | [49.262ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'analysis_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:46.291 | 
2025-07-05 00:34:46.291 | 2025/07/05 07:34:46 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:46.291 | [48.271ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'query') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:46.340 | 
2025-07-05 00:34:46.340 | 2025/07/05 07:34:46 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:46.340 | [48.418ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'result') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:46.389 | 
2025-07-05 00:34:46.389 | 2025/07/05 07:34:46 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:46.389 | [48.724ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'confidence_score') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:46.439 | 
2025-07-05 00:34:46.439 | 2025/07/05 07:34:46 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:46.439 | [50.529ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'processing_time_ms') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:46.490 | 
2025-07-05 00:34:46.490 | 2025/07/05 07:34:46 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:46.490 | [50.982ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:46.584 | 
2025-07-05 00:34:46.584 | 2025/07/05 07:34:46 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:46.584 | [93.263ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND constraint_name = 'fk_multi_document_analyses_user'
2025-07-05 00:34:46.631 | 
2025-07-05 00:34:46.631 | 2025/07/05 07:34:46 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:46.631 | [47.456ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND constraint_name = 'fk_multi_document_analyses_tenant'
2025-07-05 00:34:46.726 | 
2025-07-05 00:34:46.726 | 2025/07/05 07:34:46 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:46.726 | [94.712ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'multi_document_analyses' AND indexname = 'idx_multi_document_analyses_user_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:46.773 | 
2025-07-05 00:34:46.773 | 2025/07/05 07:34:46 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:46.773 | [47.275ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'multi_document_analyses' AND indexname = 'idx_multi_document_analyses_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:46.868 | 
2025-07-05 00:34:46.868 | 2025/07/05 07:34:46 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:46.869 | [94.797ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND table_type = 'BASE TABLE'
2025-07-05 00:34:46.963 | 
2025-07-05 00:34:46.963 | 2025/07/05 07:34:46 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:46.963 | [94.227ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:47.063 | 
2025-07-05 00:34:47.063 | 2025/07/05 07:34:47 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:47.063 | [100.290ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics'
2025-07-05 00:34:47.157 | 
2025-07-05 00:34:47.157 | 2025/07/05 07:34:47 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:47.157 | [93.991ms] [rows:-] SELECT * FROM "document_analytics" LIMIT 1
2025-07-05 00:34:47.259 | 
2025-07-05 00:34:47.259 | 2025/07/05 07:34:47 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:47.259 | [101.487ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_analytics' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:47.359 | 
2025-07-05 00:34:47.359 | 2025/07/05 07:34:47 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:47.359 | [100.135ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_analytics'
2025-07-05 00:34:47.455 | 
2025-07-05 00:34:47.455 | 2025/07/05 07:34:47 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:47.455 | [95.732ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:47.455 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:47.455 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:47.455 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:47.455 | 		AND b.relname = 'document_analytics'
2025-07-05 00:34:47.502 | 
2025-07-05 00:34:47.502 | 2025/07/05 07:34:47 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:47.502 | [47.046ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:47.549 | 
2025-07-05 00:34:47.549 | 2025/07/05 07:34:47 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:47.549 | [47.022ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:47.596 | 
2025-07-05 00:34:47.596 | 2025/07/05 07:34:47 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:47.596 | [46.968ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:47.644 | 
2025-07-05 00:34:47.644 | 2025/07/05 07:34:47 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:47.644 | [47.245ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'view_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:47.697 | 
2025-07-05 00:34:47.697 | 2025/07/05 07:34:47 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:47.697 | [53.543ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'download_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:47.750 | 
2025-07-05 00:34:47.750 | 2025/07/05 07:34:47 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:47.750 | [52.623ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'share_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:47.799 | 
2025-07-05 00:34:47.799 | 2025/07/05 07:34:47 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:47.799 | [48.679ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'last_accessed_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:47.846 | 
2025-07-05 00:34:47.846 | 2025/07/05 07:34:47 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:47.846 | [47.134ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'processing_time') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:47.893 | 
2025-07-05 00:34:47.893 | 2025/07/05 07:34:47 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:47.893 | [46.472ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'storage_cost') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:47.940 | 
2025-07-05 00:34:47.940 | 2025/07/05 07:34:47 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:47.940 | [47.263ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:47.987 | 
2025-07-05 00:34:47.987 | 2025/07/05 07:34:47 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:47.987 | [46.721ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:48.035 | 
2025-07-05 00:34:48.035 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.035 | [47.807ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND constraint_name = 'fk_document_analytics_tenant'
2025-07-05 00:34:48.083 | 
2025-07-05 00:34:48.083 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.083 | [47.864ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND constraint_name = 'fk_document_analytics_document'
2025-07-05 00:34:48.130 | 
2025-07-05 00:34:48.130 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.130 | [47.193ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_analytics' AND indexname = 'idx_document_analytics_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:48.177 | 
2025-07-05 00:34:48.177 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.177 | [46.897ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_analytics' AND indexname = 'idx_document_analytics_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:48.225 | 
2025-07-05 00:34:48.225 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.225 | [47.791ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND table_type = 'BASE TABLE'
2025-07-05 00:34:48.271 | 
2025-07-05 00:34:48.271 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.271 | [46.383ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:48.324 | 
2025-07-05 00:34:48.324 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.324 | [52.838ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'workflows'
2025-07-05 00:34:48.418 | 
2025-07-05 00:34:48.418 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.418 | [93.230ms] [rows:-] SELECT * FROM "workflows" LIMIT 1
2025-07-05 00:34:48.471 | 
2025-07-05 00:34:48.471 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.471 | [53.296ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'workflows' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:48.525 | 
2025-07-05 00:34:48.525 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.525 | [53.692ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'workflows'
2025-07-05 00:34:48.572 | 
2025-07-05 00:34:48.572 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.572 | [47.128ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:48.572 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:48.572 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:48.572 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:48.572 | 		AND b.relname = 'workflows'
2025-07-05 00:34:48.630 | 
2025-07-05 00:34:48.630 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.630 | [58.318ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:48.683 | 
2025-07-05 00:34:48.683 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.683 | [52.221ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:48.730 | 
2025-07-05 00:34:48.730 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.730 | [47.391ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:48.777 | 
2025-07-05 00:34:48.777 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.777 | [46.837ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'description') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:48.824 | 
2025-07-05 00:34:48.824 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.825 | [47.062ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'doc_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:48.872 | 
2025-07-05 00:34:48.872 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.872 | [47.359ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'rules') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:48.919 | 
2025-07-05 00:34:48.919 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.919 | [47.003ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'is_active') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:48.966 | 
2025-07-05 00:34:48.966 | 2025/07/05 07:34:48 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:48.966 | [46.676ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'created_by') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:49.013 | 
2025-07-05 00:34:49.013 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.013 | [47.086ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:49.060 | 
2025-07-05 00:34:49.060 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.060 | [46.434ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:49.107 | 
2025-07-05 00:34:49.107 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.107 | [47.843ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND constraint_name = 'fk_workflows_creator'
2025-07-05 00:34:49.156 | 
2025-07-05 00:34:49.156 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.156 | [48.069ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND constraint_name = 'fk_tenants_workflows'
2025-07-05 00:34:49.211 | 
2025-07-05 00:34:49.211 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.211 | [55.364ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'workflows' AND indexname = 'idx_workflows_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:49.259 | 
2025-07-05 00:34:49.259 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.259 | [47.532ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND table_type = 'BASE TABLE'
2025-07-05 00:34:49.306 | 
2025-07-05 00:34:49.306 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.306 | [47.319ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:49.359 | 
2025-07-05 00:34:49.359 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.359 | [52.850ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks'
2025-07-05 00:34:49.458 | 
2025-07-05 00:34:49.459 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.459 | [99.216ms] [rows:-] SELECT * FROM "workflow_tasks" LIMIT 1
2025-07-05 00:34:49.511 | 
2025-07-05 00:34:49.511 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.511 | [52.308ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'workflow_tasks' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:49.564 | 
2025-07-05 00:34:49.564 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.564 | [53.167ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'workflow_tasks'
2025-07-05 00:34:49.611 | 
2025-07-05 00:34:49.611 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.611 | [47.078ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:49.611 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:49.611 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:49.611 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:49.611 | 		AND b.relname = 'workflow_tasks'
2025-07-05 00:34:49.659 | 
2025-07-05 00:34:49.659 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.659 | [47.149ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:49.706 | 
2025-07-05 00:34:49.706 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.706 | [47.113ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'workflow_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:49.753 | 
2025-07-05 00:34:49.753 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.753 | [47.357ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:49.801 | 
2025-07-05 00:34:49.801 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.801 | [47.891ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'assigned_to') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:49.849 | 
2025-07-05 00:34:49.849 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.849 | [47.313ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'task_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:49.896 | 
2025-07-05 00:34:49.896 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.896 | [47.318ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'status') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:49.943 | 
2025-07-05 00:34:49.943 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.943 | [46.792ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'priority') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:49.993 | 
2025-07-05 00:34:49.993 | 2025/07/05 07:34:49 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:49.993 | [49.766ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'due_date') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:50.041 | 
2025-07-05 00:34:50.041 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.041 | [48.128ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'comments') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:50.088 | 
2025-07-05 00:34:50.089 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.089 | [47.168ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'completed_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:50.139 | 
2025-07-05 00:34:50.139 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.139 | [50.394ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:50.186 | 
2025-07-05 00:34:50.186 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.186 | [46.601ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:50.233 | 
2025-07-05 00:34:50.233 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.233 | [47.253ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND constraint_name = 'fk_users_workflow_tasks'
2025-07-05 00:34:50.280 | 
2025-07-05 00:34:50.280 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.280 | [47.019ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND constraint_name = 'fk_workflows_tasks'
2025-07-05 00:34:50.332 | 
2025-07-05 00:34:50.332 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.332 | [51.819ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND constraint_name = 'fk_documents_workflow_tasks'
2025-07-05 00:34:50.380 | 
2025-07-05 00:34:50.380 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.380 | [47.450ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'workflow_tasks' AND indexname = 'idx_workflow_tasks_workflow_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:50.427 | 
2025-07-05 00:34:50.427 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.427 | [46.970ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'workflow_tasks' AND indexname = 'idx_workflow_tasks_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:50.473 | 
2025-07-05 00:34:50.473 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.473 | [46.027ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'workflow_tasks' AND indexname = 'idx_workflow_tasks_assigned_to' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:50.520 | 
2025-07-05 00:34:50.520 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.520 | [47.523ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND table_type = 'BASE TABLE'
2025-07-05 00:34:50.567 | 
2025-07-05 00:34:50.567 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.567 | [46.874ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:50.620 | 
2025-07-05 00:34:50.620 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.620 | [52.228ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'notifications'
2025-07-05 00:34:50.714 | 
2025-07-05 00:34:50.714 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.714 | [93.933ms] [rows:-] SELECT * FROM "notifications" LIMIT 1
2025-07-05 00:34:50.766 | 
2025-07-05 00:34:50.767 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.767 | [52.505ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'notifications' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:50.821 | 
2025-07-05 00:34:50.821 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.821 | [53.966ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'notifications'
2025-07-05 00:34:50.868 | 
2025-07-05 00:34:50.868 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.868 | [46.945ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:50.868 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:50.868 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:50.868 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:50.868 | 		AND b.relname = 'notifications'
2025-07-05 00:34:50.918 | 
2025-07-05 00:34:50.918 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.918 | [50.530ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:50.966 | 
2025-07-05 00:34:50.966 | 2025/07/05 07:34:50 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:50.966 | [47.897ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:51.014 | 
2025-07-05 00:34:51.014 | 2025/07/05 07:34:51 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:51.014 | [47.721ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'user_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:51.061 | 
2025-07-05 00:34:51.061 | 2025/07/05 07:34:51 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:51.061 | [46.675ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:51.109 | 
2025-07-05 00:34:51.109 | 2025/07/05 07:34:51 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:51.109 | [48.290ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'title') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:51.156 | 
2025-07-05 00:34:51.156 | 2025/07/05 07:34:51 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:51.156 | [46.999ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'message') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:51.204 | 
2025-07-05 00:34:51.204 | 2025/07/05 07:34:51 
2025-07-05 00:34:51.204 | [47.019ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:51.262 | 
2025-07-05 00:34:51.262 | 2025/07/05 07:34:51 
2025-07-05 00:34:51.262 | [58.188ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'notifications'
2025-07-05 00:34:51.309 | 
2025-07-05 00:34:51.309 | 2025/07/05 07:34:51 
2025-07-05 00:34:51.309 | [47.070ms] [rows:-] SELECT * FROM "notifications" LIMIT 1
2025-07-05 00:34:51.362 | 
2025-07-05 00:34:51.362 | 2025/07/05 07:34:51 
2025-07-05 00:34:51.362 | [52.470ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'notifications' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:51.415 | 
2025-07-05 00:34:51.415 | 2025/07/05 07:34:51 
2025-07-05 00:34:51.415 | [53.060ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'notifications'
2025-07-05 00:34:51.462 | 
2025-07-05 00:34:51.462 | 2025/07/05 07:34:51 
2025-07-05 00:34:51.462 | [47.002ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:51.462 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:51.462 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:51.462 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:51.462 | 		AND b.relname = 'notifications'
2025-07-05 00:34:51.558 | 
2025-07-05 00:34:51.558 | 2025/07/05 07:34:51 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:51.558 | [95.896ms] [rows:0] ALTER TABLE "notifications" ALTER COLUMN "channel" TYPE varchar(20) USING "channel"::varchar(20)
2025-07-05 00:34:52.336 | 
2025-07-05 00:34:52.337 | 2025/07/05 07:34:52 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:52.337 | [778.287ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'channel') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:52.385 | 
2025-07-05 00:34:52.385 | 2025/07/05 07:34:52 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:52.385 | [48.163ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'is_read') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:52.434 | 
2025-07-05 00:34:52.434 | 2025/07/05 07:34:52 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:52.434 | [48.892ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'data') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:52.482 | 
2025-07-05 00:34:52.482 | 2025/07/05 07:34:52 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:52.482 | [48.610ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:52.577 | 
2025-07-05 00:34:52.577 | 2025/07/05 07:34:52 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:52.577 | [94.596ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND constraint_name = 'fk_notifications_tenant'
2025-07-05 00:34:52.625 | 
2025-07-05 00:34:52.625 | 2025/07/05 07:34:52 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:52.625 | [47.447ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND constraint_name = 'fk_notifications_user'
2025-07-05 00:34:52.718 | 
2025-07-05 00:34:52.718 | 2025/07/05 07:34:52 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:52.718 | [93.779ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'notifications' AND indexname = 'idx_notifications_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:52.766 | 
2025-07-05 00:34:52.766 | 2025/07/05 07:34:52 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:52.766 | [47.481ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'notifications' AND indexname = 'idx_notifications_user_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:52.859 | 
2025-07-05 00:34:52.859 | 2025/07/05 07:34:52 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:52.859 | [93.223ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND table_type = 'BASE TABLE'
2025-07-05 00:34:52.955 | 
2025-07-05 00:34:52.955 | 2025/07/05 07:34:52 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:52.955 | [96.114ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:53.054 | 
2025-07-05 00:34:53.054 | 2025/07/05 07:34:53 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:53.054 | [98.719ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs'
2025-07-05 00:34:53.155 | 
2025-07-05 00:34:53.155 | 2025/07/05 07:34:53 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:53.155 | [100.438ms] [rows:-] SELECT * FROM "a_iprocessing_jobs" LIMIT 1
2025-07-05 00:34:53.255 | 
2025-07-05 00:34:53.255 | 2025/07/05 07:34:53 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:53.255 | [100.168ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'a_iprocessing_jobs' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:53.996 | 
2025-07-05 00:34:53.996 | 2025/07/05 07:34:53 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:53.996 | [99.788ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'a_iprocessing_jobs'
2025-07-05 00:34:54.089 | 
2025-07-05 00:34:54.089 | 2025/07/05 07:34:54 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:54.089 | [93.527ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:54.089 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:54.089 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:54.089 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:54.089 | 		AND b.relname = 'a_iprocessing_jobs'
2025-07-05 00:34:54.862 | 
2025-07-05 00:34:54.862 | 2025/07/05 07:34:54 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:54.862 | [48.882ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:54.913 | 
2025-07-05 00:34:54.913 | 2025/07/05 07:34:54 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:54.913 | [51.223ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:54.961 | 
2025-07-05 00:34:54.961 | 2025/07/05 07:34:54 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:54.961 | [47.504ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:55.008 | 
2025-07-05 00:34:55.008 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.008 | [46.789ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'job_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:55.058 | 
2025-07-05 00:34:55.058 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.058 | [49.633ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'status') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:55.104 | 
2025-07-05 00:34:55.104 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.104 | [46.545ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'priority') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:55.151 | 
2025-07-05 00:34:55.151 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.151 | [47.054ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'attempts') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:55.199 | 
2025-07-05 00:34:55.199 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.199 | [47.531ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'max_attempts') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:55.246 | 
2025-07-05 00:34:55.246 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.246 | [47.120ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'error_message') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:55.293 | 
2025-07-05 00:34:55.293 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.293 | [47.007ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'result') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:55.340 | 
2025-07-05 00:34:55.340 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.340 | [46.307ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'processing_time_ms') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:55.386 | 
2025-07-05 00:34:55.387 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.387 | [46.548ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:55.435 | 
2025-07-05 00:34:55.435 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.435 | [47.994ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'started_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:55.481 | 
2025-07-05 00:34:55.481 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.481 | [46.714ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'completed_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:55.529 | 
2025-07-05 00:34:55.529 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.529 | [47.620ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND constraint_name = 'fk_documents_ai_jobs'
2025-07-05 00:34:55.577 | 
2025-07-05 00:34:55.577 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.577 | [47.657ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND constraint_name = 'fk_tenants_ai_jobs'
2025-07-05 00:34:55.628 | 
2025-07-05 00:34:55.628 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.628 | [51.014ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'a_iprocessing_jobs' AND indexname = 'idx_a_iprocessing_jobs_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:55.675 | 
2025-07-05 00:34:55.675 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.675 | [46.741ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'a_iprocessing_jobs' AND indexname = 'idx_a_iprocessing_jobs_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:55.722 | 
2025-07-05 00:34:55.722 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.722 | [46.900ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'a_iprocessing_jobs' AND indexname = 'idx_a_iprocessing_jobs_status' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:55.775 | 
2025-07-05 00:34:55.775 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.775 | [52.831ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND table_type = 'BASE TABLE'
2025-07-05 00:34:55.821 | 
2025-07-05 00:34:55.821 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.821 | [46.117ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:55.873 | 
2025-07-05 00:34:55.873 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.873 | [52.290ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs'
2025-07-05 00:34:55.972 | 
2025-07-05 00:34:55.972 | 2025/07/05 07:34:55 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:55.972 | [98.475ms] [rows:-] SELECT * FROM "audit_logs" LIMIT 1
2025-07-05 00:34:56.024 | 
2025-07-05 00:34:56.024 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.024 | [52.432ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'audit_logs' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:56.077 | 
2025-07-05 00:34:56.077 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.077 | [52.548ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'audit_logs'
2025-07-05 00:34:56.123 | 
2025-07-05 00:34:56.123 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.123 | [46.310ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:56.123 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:56.123 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:56.123 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:56.123 | 		AND b.relname = 'audit_logs'
2025-07-05 00:34:56.171 | 
2025-07-05 00:34:56.171 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.171 | [46.997ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:56.218 | 
2025-07-05 00:34:56.219 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.219 | [47.535ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:56.265 | 
2025-07-05 00:34:56.265 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.265 | [47.042ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'user_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:56.312 | 
2025-07-05 00:34:56.313 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.313 | [46.887ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'resource_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:56.361 | 
2025-07-05 00:34:56.362 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.362 | [48.928ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'action') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:56.409 | 
2025-07-05 00:34:56.409 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.409 | [47.632ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'resource_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:56.456 | 
2025-07-05 00:34:56.456 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.456 | [46.958ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'ip_address') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:56.504 | 
2025-07-05 00:34:56.504 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.504 | [47.620ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'user_agent') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:56.551 | 
2025-07-05 00:34:56.551 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.551 | [47.254ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'details') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:56.599 | 
2025-07-05 00:34:56.599 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.599 | [47.213ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:56.647 | 
2025-07-05 00:34:56.647 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.647 | [47.816ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND constraint_name = 'fk_audit_logs_tenant'
2025-07-05 00:34:56.694 | 
2025-07-05 00:34:56.694 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.694 | [47.006ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND constraint_name = 'fk_audit_logs_user'
2025-07-05 00:34:56.742 | 
2025-07-05 00:34:56.742 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.742 | [48.398ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'audit_logs' AND indexname = 'idx_audit_logs_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:56.789 | 
2025-07-05 00:34:56.789 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.789 | [47.003ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'audit_logs' AND indexname = 'idx_audit_logs_user_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:56.836 | 
2025-07-05 00:34:56.836 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.836 | [46.788ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'audit_logs' AND indexname = 'idx_audit_logs_resource_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:56.888 | 
2025-07-05 00:34:56.888 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.888 | [51.106ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND table_type = 'BASE TABLE'
2025-07-05 00:34:56.935 | 
2025-07-05 00:34:56.935 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.935 | [47.050ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:56.990 | 
2025-07-05 00:34:56.990 | 2025/07/05 07:34:56 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:56.990 | [55.003ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'shares'
2025-07-05 00:34:57.083 | 
2025-07-05 00:34:57.083 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.083 | [93.314ms] [rows:-] SELECT * FROM "shares" LIMIT 1
2025-07-05 00:34:57.140 | 
2025-07-05 00:34:57.140 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.140 | [56.573ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'shares' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:57.194 | 
2025-07-05 00:34:57.194 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.194 | [54.164ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'shares'
2025-07-05 00:34:57.242 | 
2025-07-05 00:34:57.242 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.242 | [47.624ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:57.242 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:57.242 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:57.242 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:57.242 | 		AND b.relname = 'shares'
2025-07-05 00:34:57.289 | 
2025-07-05 00:34:57.289 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.289 | [46.968ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:57.336 | 
2025-07-05 00:34:57.336 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.336 | [46.945ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:57.383 | 
2025-07-05 00:34:57.383 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.383 | [46.814ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:57.430 | 
2025-07-05 00:34:57.430 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.430 | [46.546ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'created_by') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:57.477 | 
2025-07-05 00:34:57.477 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.477 | [47.036ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'token') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:57.525 | 
2025-07-05 00:34:57.525 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.525 | [48.019ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'password') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:57.574 | 
2025-07-05 00:34:57.574 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.574 | [48.793ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'expires_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:57.622 | 
2025-07-05 00:34:57.622 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.622 | [47.581ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'max_downloads') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:57.668 | 
2025-07-05 00:34:57.668 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.669 | [46.761ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'download_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:57.715 | 
2025-07-05 00:34:57.715 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.715 | [46.482ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'is_active') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:57.762 | 
2025-07-05 00:34:57.762 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.762 | [46.927ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:57.809 | 
2025-07-05 00:34:57.809 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.809 | [46.718ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:57.859 | 
2025-07-05 00:34:57.859 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.859 | [49.570ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND constraint_name = 'fk_shares_creator'
2025-07-05 00:34:57.906 | 
2025-07-05 00:34:57.906 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.906 | [46.477ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND constraint_name = 'fk_shares_tenant'
2025-07-05 00:34:57.953 | 
2025-07-05 00:34:57.953 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.953 | [46.793ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND constraint_name = 'fk_shares_document'
2025-07-05 00:34:57.999 | 
2025-07-05 00:34:57.999 | 2025/07/05 07:34:57 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:57.999 | [46.226ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'shares' AND indexname = 'idx_shares_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:58.046 | 
2025-07-05 00:34:58.046 | 2025/07/05 07:34:58 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:58.046 | [47.118ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'shares' AND indexname = 'idx_shares_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:58.092 | 
2025-07-05 00:34:58.092 | 2025/07/05 07:34:58 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:58.092 | [45.894ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'shares' AND indexname = 'idx_shares_created_by' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:34:58.139 | 
2025-07-05 00:34:58.139 | 2025/07/05 07:34:58 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:58.139 | [47.169ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND table_type = 'BASE TABLE'
2025-07-05 00:34:58.186 | 
2025-07-05 00:34:58.186 | 2025/07/05 07:34:58 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:58.186 | [46.180ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:58.239 | 
2025-07-05 00:34:58.239 | 2025/07/05 07:34:58 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:58.239 | [53.179ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions'
2025-07-05 00:34:58.341 | 
2025-07-05 00:34:58.341 | 2025/07/05 07:34:58 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:58.341 | [101.735ms] [rows:-] SELECT * FROM "subscriptions" LIMIT 1
2025-07-05 00:34:58.400 | 
2025-07-05 00:34:58.400 | 2025/07/05 07:34:58 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:58.400 | [58.852ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'subscriptions' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:58.461 | 
2025-07-05 00:34:58.461 | 2025/07/05 07:34:58 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:58.461 | [60.837ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'subscriptions'
2025-07-05 00:34:58.509 | 
2025-07-05 00:34:58.509 | 2025/07/05 07:34:58 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:58.509 | [47.832ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:58.509 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:58.509 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:58.509 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:58.509 | 		AND b.relname = 'subscriptions'
2025-07-05 00:34:58.558 | 
2025-07-05 00:34:58.558 | 2025/07/05 07:34:58 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:58.558 | [49.036ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:58.604 | 
2025-07-05 00:34:58.605 | 2025/07/05 07:34:58 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:58.605 | [46.620ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:58.653 | 
2025-07-05 00:34:58.654 | 2025/07/05 07:34:58 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:58.654 | [48.874ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'stripe_customer_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:58.704 | 
2025-07-05 00:34:58.704 | 2025/07/05 07:34:58 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:58.704 | [50.674ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'stripe_subscription_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:58.755 | 
2025-07-05 00:34:58.755 | 2025/07/05 07:34:58 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:58.755 | [50.543ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'stripe_price_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:58.802 | 
2025-07-05 00:34:58.802 | 2025/07/05 07:34:58 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:58.802 | [46.672ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'stripe_product_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:34:58.849 | 
2025-07-05 00:34:58.849 | 2025/07/05 07:34:58 
2025-07-05 00:34:58.849 | [46.948ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:34:58.909 | 
2025-07-05 00:34:58.909 | 2025/07/05 07:34:58 
2025-07-05 00:34:58.909 | [60.111ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions'
2025-07-05 00:34:58.960 | 
2025-07-05 00:34:58.960 | 2025/07/05 07:34:58 
2025-07-05 00:34:58.960 | [51.038ms] [rows:-] SELECT * FROM "subscriptions" LIMIT 1
2025-07-05 00:34:59.019 | 
2025-07-05 00:34:59.019 | 2025/07/05 07:34:59 
2025-07-05 00:34:59.019 | [58.434ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'subscriptions' AND constraint_type = 'UNIQUE'
2025-07-05 00:34:59.082 | 
2025-07-05 00:34:59.082 | 2025/07/05 07:34:59 
2025-07-05 00:34:59.082 | [63.205ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'subscriptions'
2025-07-05 00:34:59.133 | 
2025-07-05 00:34:59.133 | 2025/07/05 07:34:59 
2025-07-05 00:34:59.133 | [50.781ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:34:59.133 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:34:59.133 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:34:59.133 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:34:59.133 | 		AND b.relname = 'subscriptions'
2025-07-05 00:34:59.236 | 
2025-07-05 00:34:59.237 | 2025/07/05 07:34:59 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:34:59.237 | [103.148ms] [rows:0] ALTER TABLE "subscriptions" ALTER COLUMN "status" TYPE varchar(30) USING "status"::varchar(30)
2025-07-05 00:34:59.997 | 
2025-07-05 00:34:59.997 | 2025/07/05 07:34:59 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:34:59.997 | [760.283ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'status') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:00.090 | 
2025-07-05 00:35:00.090 | 2025/07/05 07:35:00 
2025-07-05 00:35:00.090 | [92.901ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:35:00.194 | 
2025-07-05 00:35:00.194 | 2025/07/05 07:35:00 
2025-07-05 00:35:00.194 | [103.751ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions'
2025-07-05 00:35:00.291 | 
2025-07-05 00:35:00.291 | 2025/07/05 07:35:00 
2025-07-05 00:35:00.291 | [97.404ms] [rows:-] SELECT * FROM "subscriptions" LIMIT 1
2025-07-05 00:35:00.403 | 
2025-07-05 00:35:00.403 | 2025/07/05 07:35:00 
2025-07-05 00:35:00.403 | [111.352ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'subscriptions' AND constraint_type = 'UNIQUE'
2025-07-05 00:35:00.509 | 
2025-07-05 00:35:00.509 | 2025/07/05 07:35:00 
2025-07-05 00:35:00.509 | [105.859ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'subscriptions'
2025-07-05 00:35:00.603 | 
2025-07-05 00:35:00.603 | 2025/07/05 07:35:00 
2025-07-05 00:35:00.603 | [94.082ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:35:00.603 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:35:00.603 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:35:00.603 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:35:00.603 | 		AND b.relname = 'subscriptions'
2025-07-05 00:35:00.701 | 
2025-07-05 00:35:00.701 | 2025/07/05 07:35:00 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:00.701 | [97.788ms] [rows:0] ALTER TABLE "subscriptions" ALTER COLUMN "tier" TYPE varchar(20) USING "tier"::varchar(20)
2025-07-05 00:35:01.190 | 
2025-07-05 00:35:01.190 | 2025/07/05 07:35:01 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:35:01.190 | [488.975ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'tier') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:01.240 | 
2025-07-05 00:35:01.241 | 2025/07/05 07:35:01 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:01.241 | [50.062ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'plan_name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:01.289 | 
2025-07-05 00:35:01.289 | 2025/07/05 07:35:01 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:01.289 | [48.515ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'amount') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:01.337 | 
2025-07-05 00:35:01.338 | 2025/07/05 07:35:01 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:01.338 | [48.361ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'currency') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:01.387 | 
2025-07-05 00:35:01.387 | 2025/07/05 07:35:01 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:01.387 | [48.831ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'interval') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:01.435 | 
2025-07-05 00:35:01.435 | 2025/07/05 07:35:01 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:01.435 | [48.877ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'interval_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:01.483 | 
2025-07-05 00:35:01.483 | 2025/07/05 07:35:01 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:01.483 | [47.331ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'current_period_start') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:01.531 | 
2025-07-05 00:35:01.531 | 2025/07/05 07:35:01 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:01.531 | [47.622ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'current_period_end') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:01.578 | 
2025-07-05 00:35:01.578 | 2025/07/05 07:35:01 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:01.578 | [47.609ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'trial_start') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:01.626 | 
2025-07-05 00:35:01.626 | 2025/07/05 07:35:01 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:01.626 | [47.396ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'trial_end') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:01.673 | 
2025-07-05 00:35:01.673 | 2025/07/05 07:35:01 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:01.673 | [47.237ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'canceled_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:01.721 | 
2025-07-05 00:35:01.721 | 2025/07/05 07:35:01 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:01.721 | [47.371ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'cancel_at_period_end') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:01.767 | 
2025-07-05 00:35:01.768 | 2025/07/05 07:35:01 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:01.768 | [46.734ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'documents_included') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:01.815 | 
2025-07-05 00:35:01.815 | 2025/07/05 07:35:01 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:01.815 | [47.177ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'documents_used') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:01.862 | 
2025-07-05 00:35:01.862 | 2025/07/05 07:35:01 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:01.862 | [47.336ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'storage_included') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:01.909 | 
2025-07-05 00:35:01.909 | 2025/07/05 07:35:01 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:01.909 | [46.438ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'storage_used') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:01.956 | 
2025-07-05 00:35:01.956 | 2025/07/05 07:35:01 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:01.956 | [46.840ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'ai_credits_included') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:02.003 | 
2025-07-05 00:35:02.003 | 2025/07/05 07:35:02 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:02.003 | [46.816ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'ai_credits_used') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:02.050 | 
2025-07-05 00:35:02.050 | 2025/07/05 07:35:02 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:02.050 | [47.371ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'users_included') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:02.144 | 
2025-07-05 00:35:02.144 | 2025/07/05 07:35:02 
2025-07-05 00:35:02.144 | [93.817ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:35:02.249 | 
2025-07-05 00:35:02.249 | 2025/07/05 07:35:02 
2025-07-05 00:35:02.249 | [104.523ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions'
2025-07-05 00:35:02.356 | 
2025-07-05 00:35:02.356 | 2025/07/05 07:35:02 
2025-07-05 00:35:02.356 | [106.634ms] [rows:-] SELECT * FROM "subscriptions" LIMIT 1
2025-07-05 00:35:02.461 | 
2025-07-05 00:35:02.461 | 2025/07/05 07:35:02 
2025-07-05 00:35:02.461 | [105.063ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'subscriptions' AND constraint_type = 'UNIQUE'
2025-07-05 00:35:02.567 | 
2025-07-05 00:35:02.567 | 2025/07/05 07:35:02 
2025-07-05 00:35:02.567 | [105.864ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'subscriptions'
2025-07-05 00:35:02.665 | 
2025-07-05 00:35:02.665 | 2025/07/05 07:35:02 
2025-07-05 00:35:02.665 | [98.230ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:35:02.665 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:35:02.665 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:35:02.665 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:35:02.665 | 		AND b.relname = 'subscriptions'
2025-07-05 00:35:02.761 | 
2025-07-05 00:35:02.761 | 2025/07/05 07:35:02 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:02.761 | [95.519ms] [rows:0] ALTER TABLE "subscriptions" ALTER COLUMN "features" SET DEFAULT '{}'
2025-07-05 00:35:03.243 | 
2025-07-05 00:35:03.243 | 2025/07/05 07:35:03 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-05 00:35:03.243 | [482.379ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'features') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:03.292 | 
2025-07-05 00:35:03.292 | 2025/07/05 07:35:03 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:03.292 | [48.589ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:03.343 | 
2025-07-05 00:35:03.343 | 2025/07/05 07:35:03 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:03.343 | [50.463ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:03.442 | 
2025-07-05 00:35:03.442 | 2025/07/05 07:35:03 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:03.442 | [99.266ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND constraint_name = 'fk_subscriptions_tenant'
2025-07-05 00:35:03.537 | 
2025-07-05 00:35:03.537 | 2025/07/05 07:35:03 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:03.537 | [94.470ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'subscriptions' AND indexname = 'idx_subscriptions_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:35:03.584 | 
2025-07-05 00:35:03.584 | 2025/07/05 07:35:03 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:03.584 | [47.481ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'subscriptions' AND indexname = 'idx_subscriptions_status' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:35:03.632 | 
2025-07-05 00:35:03.632 | 2025/07/05 07:35:03 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:03.632 | [47.722ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'subscriptions' AND indexname = 'idx_subscriptions_current_period_end' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:35:03.726 | 
2025-07-05 00:35:03.726 | 2025/07/05 07:35:03 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:03.726 | [93.717ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND table_type = 'BASE TABLE'
2025-07-05 00:35:03.819 | 
2025-07-05 00:35:03.819 | 2025/07/05 07:35:03 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:03.824 | [92.784ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:35:03.922 | 
2025-07-05 00:35:03.922 | 2025/07/05 07:35:03 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:03.922 | [103.273ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'invoices'
2025-07-05 00:35:04.020 | 
2025-07-05 00:35:04.020 | 2025/07/05 07:35:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:04.020 | [97.638ms] [rows:-] SELECT * FROM "invoices" LIMIT 1
2025-07-05 00:35:04.122 | 
2025-07-05 00:35:04.122 | 2025/07/05 07:35:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:04.122 | [101.830ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'invoices' AND constraint_type = 'UNIQUE'
2025-07-05 00:35:04.225 | 
2025-07-05 00:35:04.225 | 2025/07/05 07:35:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:04.225 | [103.318ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'invoices'
2025-07-05 00:35:04.319 | 
2025-07-05 00:35:04.320 | 2025/07/05 07:35:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:04.320 | [94.261ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:35:04.320 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:35:04.320 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:35:04.320 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:35:04.320 | 		AND b.relname = 'invoices'
2025-07-05 00:35:04.368 | 
2025-07-05 00:35:04.368 | 2025/07/05 07:35:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:04.368 | [48.013ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:04.420 | 
2025-07-05 00:35:04.420 | 2025/07/05 07:35:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:04.420 | [52.081ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:04.472 | 
2025-07-05 00:35:04.472 | 2025/07/05 07:35:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:04.472 | [52.182ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'subscription_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:04.519 | 
2025-07-05 00:35:04.519 | 2025/07/05 07:35:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:04.519 | [47.249ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'stripe_invoice_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:04.571 | 
2025-07-05 00:35:04.571 | 2025/07/05 07:35:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:04.571 | [51.574ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'stripe_payment_intent_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:04.618 | 
2025-07-05 00:35:04.618 | 2025/07/05 07:35:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:04.618 | [46.945ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'invoice_number') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:04.669 | 
2025-07-05 00:35:04.669 | 2025/07/05 07:35:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:04.669 | [50.308ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'status') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:04.716 | 
2025-07-05 00:35:04.716 | 2025/07/05 07:35:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:04.716 | [47.082ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'amount_due') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:04.764 | 
2025-07-05 00:35:04.764 | 2025/07/05 07:35:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:04.764 | [48.269ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'amount_paid') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:04.811 | 
2025-07-05 00:35:04.811 | 2025/07/05 07:35:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:04.811 | [47.187ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'subtotal') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:04.859 | 
2025-07-05 00:35:04.859 | 2025/07/05 07:35:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:04.859 | [47.232ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'tax') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:04.907 | 
2025-07-05 00:35:04.908 | 2025/07/05 07:35:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:04.908 | [48.565ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'total') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:04.955 | 
2025-07-05 00:35:04.955 | 2025/07/05 07:35:04 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:04.955 | [47.263ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'currency') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:05.002 | 
2025-07-05 00:35:05.002 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.002 | [47.127ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'period_start') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:05.050 | 
2025-07-05 00:35:05.050 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.050 | [47.595ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'period_end') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:05.097 | 
2025-07-05 00:35:05.097 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.097 | [46.757ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'due_date') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:05.144 | 
2025-07-05 00:35:05.144 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.144 | [47.100ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'paid_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:05.191 | 
2025-07-05 00:35:05.191 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.191 | [47.311ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'hosted_invoice_url') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:05.238 | 
2025-07-05 00:35:05.238 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.238 | [46.796ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'invoice_pdf') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:05.285 | 
2025-07-05 00:35:05.285 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.285 | [47.019ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:05.333 | 
2025-07-05 00:35:05.333 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.333 | [47.310ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:05.381 | 
2025-07-05 00:35:05.381 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.381 | [48.569ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND constraint_name = 'fk_subscriptions_invoices'
2025-07-05 00:35:05.429 | 
2025-07-05 00:35:05.429 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.429 | [47.885ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND constraint_name = 'fk_invoices_tenant'
2025-07-05 00:35:05.480 | 
2025-07-05 00:35:05.480 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.480 | [51.148ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'invoices' AND indexname = 'idx_invoices_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:35:05.528 | 
2025-07-05 00:35:05.528 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.528 | [46.995ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'invoices' AND indexname = 'idx_invoices_subscription_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:35:05.575 | 
2025-07-05 00:35:05.575 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.575 | [47.257ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'invoices' AND indexname = 'idx_invoices_status' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:35:05.622 | 
2025-07-05 00:35:05.622 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.622 | [47.150ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND table_type = 'BASE TABLE'
2025-07-05 00:35:05.669 | 
2025-07-05 00:35:05.669 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.669 | [46.325ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-05 00:35:05.721 | 
2025-07-05 00:35:05.721 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.721 | [52.072ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records'
2025-07-05 00:35:05.816 | 
2025-07-05 00:35:05.816 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.816 | [94.808ms] [rows:-] SELECT * FROM "usage_records" LIMIT 1
2025-07-05 00:35:05.868 | 
2025-07-05 00:35:05.868 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.868 | [52.653ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'usage_records' AND constraint_type = 'UNIQUE'
2025-07-05 00:35:05.925 | 
2025-07-05 00:35:05.925 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.925 | [56.982ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'usage_records'
2025-07-05 00:35:05.972 | 
2025-07-05 00:35:05.972 | 2025/07/05 07:35:05 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:05.973 | [46.903ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-05 00:35:05.973 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-05 00:35:05.973 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-05 00:35:05.973 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-05 00:35:05.973 | 		AND b.relname = 'usage_records'
2025-07-05 00:35:06.020 | 
2025-07-05 00:35:06.020 | 2025/07/05 07:35:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:06.020 | [47.146ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:06.067 | 
2025-07-05 00:35:06.067 | 2025/07/05 07:35:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:06.067 | [46.948ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:06.115 | 
2025-07-05 00:35:06.115 | 2025/07/05 07:35:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:06.115 | [48.075ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'subscription_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:06.161 | 
2025-07-05 00:35:06.161 | 2025/07/05 07:35:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:06.161 | [46.339ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'metric_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:06.208 | 
2025-07-05 00:35:06.208 | 2025/07/05 07:35:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:06.208 | [46.856ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'quantity') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:06.255 | 
2025-07-05 00:35:06.255 | 2025/07/05 07:35:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:06.255 | [46.569ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'unit') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:06.305 | 
2025-07-05 00:35:06.305 | 2025/07/05 07:35:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:06.305 | [49.966ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'period_start') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:06.351 | 
2025-07-05 00:35:06.351 | 2025/07/05 07:35:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:06.351 | [46.237ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'period_end') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:06.399 | 
2025-07-05 00:35:06.399 | 2025/07/05 07:35:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:06.399 | [47.471ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-05 00:35:06.447 | 
2025-07-05 00:35:06.447 | 2025/07/05 07:35:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:06.447 | [47.795ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND constraint_name = 'fk_usage_records_tenant'
2025-07-05 00:35:06.495 | 
2025-07-05 00:35:06.495 | 2025/07/05 07:35:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:06.495 | [48.127ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND constraint_name = 'fk_subscriptions_usage_records'
2025-07-05 00:35:06.542 | 
2025-07-05 00:35:06.542 | 2025/07/05 07:35:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:06.542 | [46.463ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'usage_records' AND indexname = 'idx_usage_records_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:35:06.590 | 
2025-07-05 00:35:06.590 | 2025/07/05 07:35:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:06.590 | [48.001ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'usage_records' AND indexname = 'idx_usage_records_subscription_id' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:35:06.643 | 
2025-07-05 00:35:06.644 | 2025/07/05 07:35:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:06.644 | [53.512ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'usage_records' AND indexname = 'idx_usage_records_period_start' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:35:06.691 | 
2025-07-05 00:35:06.691 | 2025/07/05 07:35:06 /app/internal/infrastructure/database/database.go:88
2025-07-05 00:35:06.691 | [46.941ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'usage_records' AND indexname = 'idx_usage_records_period_end' AND schemaname = CURRENT_SCHEMA()
2025-07-05 00:35:06.691 | {"time":"2025-07-05T07:35:06.690830723Z","level":"INFO","msg":"Database initialized successfully"}
2025-07-05 00:35:06.693 | {"time":"2025-07-05T07:35:06.692755107Z","level":"INFO","msg":"Service manager initialized successfully with Redis","redis_url":"redis://archivus-redis:6379","database_initialized":true}
2025-07-05 00:35:06.745 | {"time":"2025-07-05T07:35:06.744769082Z","level":"INFO","msg":"All services healthy - Database and Redis connected"}
2025-07-05 00:35:06.745 | {"time":"2025-07-05T07:35:06.744804606Z","level":"INFO","msg":"Database and repositories initialized successfully","repository_count":13}
2025-07-05 00:35:06.745 | {"time":"2025-07-05T07:35:06.744811102Z","level":"INFO","msg":"Initializing Supabase storage service","url":"https://ulnisgaeijkspqambdlh.supabase.co","bucket":"archies-bucket"}
2025-07-05 00:35:06.745 | {"time":"2025-07-05T07:35:06.744876765Z","level":"INFO","msg":"Supabase storage service initialized successfully"}
2025-07-05 00:35:06.745 | {"time":"2025-07-05T07:35:06.744879923Z","level":"INFO","msg":"Initializing Supabase auth service"}
2025-07-05 00:35:06.745 | {"time":"2025-07-05T07:35:06.744933677Z","level":"INFO","msg":"Supabase auth service initialized successfully"}
2025-07-05 00:35:06.745 | {"time":"2025-07-05T07:35:06.744948883Z","level":"INFO","msg":"Initializing business services with complete repository wiring..."}
2025-07-05 00:35:06.745 | {"time":"2025-07-05T07:35:06.744965154Z","level":"INFO","msg":"AI processing disabled, OCR and AI services will not be available"}
2025-07-05 00:35:06.745 | {"time":"2025-07-05T07:35:06.74499527Z","level":"INFO","msg":"🎉 Business services initialized successfully!","user_service":true,"tenant_service":true,"document_service":true,"workflow_service":true,"analytics_service":true,"oauth_service":true,"chat_service":false,"stripe_service":false}
2025-07-05 00:35:06.745 | [GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
2025-07-05 00:35:06.745 |  - using env:	export GIN_MODE=release
2025-07-05 00:35:06.745 |  - using code:	gin.SetMode(gin.ReleaseMode)
2025-07-05 00:35:06.745 | 
2025-07-05 00:35:06.745 | [GIN-debug] OPTIONS /*path                    --> github.com/archivus/archivus/internal/app/server.NewServer.func1 (1 handlers)
2025-07-05 00:35:06.745 | {"time":"2025-07-05T07:35:06.745193829Z","level":"INFO","msg":"Configuration validation completed","valid":true,"environment":"development","error_count":0,"warning_count":0,"missing_features":["ai_processing","ocr","webhooks"]}
2025-07-05 00:35:06.745 | [GIN-debug] GET    /health                   --> github.com/archivus/archivus/internal/app/server.(*Server).healthCheck-fm (8 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /ready                    --> github.com/archivus/archivus/internal/app/server.(*Server).readinessCheck-fm (8 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /health/comprehensive     --> github.com/archivus/archivus/internal/app/server.(*Server).comprehensiveHealthCheck-fm (8 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/tenant            --> github.com/archivus/archivus/internal/app/handlers.(*TenantHandler).CreateTenant-fm (9 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/auth/register     --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).Register-fm (9 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/auth/login        --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).Login-fm (9 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/auth/logout       --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).Logout-fm (9 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/auth/refresh      --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).RefreshToken-fm (9 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/auth/reset-password --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).ResetPassword-fm (9 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/auth/validate     --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).ValidateToken-fm (9 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/auth/webhook      --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).SupabaseWebhook-fm (9 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/auth/lookup-subdomain --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).LookupSubdomain-fm (9 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/auth/csrf-token   --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).GetCSRFToken-fm (9 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/auth/oauth/url    --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).GetOAuthURL-fm (9 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/auth/oauth/callback --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).HandleOAuthCallback-fm (9 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/auth/oauth/callback --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).HandleOAuthCallback-fm (9 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/auth/admin/create-verified-user --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).AdminCreateVerifiedUser-fm (9 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/documents/upload  --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).UploadDocument-fm (12 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/documents/        --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).ListDocuments-fm (12 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/documents         --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).ListDocuments-fm (12 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/documents/search  --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).SearchDocuments-fm (12 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/documents/:id     --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).GetDocument-fm (12 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] PUT    /api/v1/documents/:id     --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).UpdateDocument-fm (12 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] DELETE /api/v1/documents/:id     --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).DeleteDocument-fm (12 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/documents/:id/download --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).DownloadDocument-fm (12 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/documents/:id/preview --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).PreviewDocument-fm (12 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/documents/:id/ai-results --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).GetDocumentAIResults-fm (12 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/documents/:id/jobs --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).GetDocumentJobs-fm (12 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/documents/:id/summary --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).GetDocumentSummary-fm (12 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/documents/:id/process-financial --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).ProcessFinancialDocument-fm (12 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/documents/duplicates --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).FindDuplicates-fm (12 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/documents/expiring --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).GetExpiringDocuments-fm (12 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/documents/:id/processing-status --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).GetDocumentProcessingStatus-fm (12 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/documents/batch-status --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).GetBatchProcessingStatus-fm (12 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/users/profile     --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).GetProfile-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] PUT    /api/v1/users/profile     --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).UpdateProfile-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/users/change-password --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).ChangePassword-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/users             --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).ListUsers-fm (11 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/users             --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).CreateUser-fm (11 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] PUT    /api/v1/users/:id         --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).UpdateUser-fm (11 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] DELETE /api/v1/users/:id         --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).DeleteUser-fm (11 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] PUT    /api/v1/users/:id/role    --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).UpdateUserRole-fm (11 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] PUT    /api/v1/users/:id/activate --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).ActivateUser-fm (11 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] PUT    /api/v1/users/:id/deactivate --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).DeactivateUser-fm (11 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/tenant/settings   --> github.com/archivus/archivus/internal/app/handlers.(*TenantHandler).GetSettings-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] PUT    /api/v1/tenant/settings   --> github.com/archivus/archivus/internal/app/handlers.(*TenantHandler).UpdateSettings-fm (11 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/tenant/usage      --> github.com/archivus/archivus/internal/app/handlers.(*TenantHandler).GetUsage-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/tenant/users      --> github.com/archivus/archivus/internal/app/handlers.(*TenantHandler).GetTenantUsers-fm (11 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/folders           --> github.com/archivus/archivus/internal/app/handlers.(*FolderHandler).CreateFolder-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/folders           --> github.com/archivus/archivus/internal/app/handlers.(*FolderHandler).ListFolders-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/folders/:id       --> github.com/archivus/archivus/internal/app/handlers.(*FolderHandler).GetFolder-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] PUT    /api/v1/folders/:id       --> github.com/archivus/archivus/internal/app/handlers.(*FolderHandler).UpdateFolder-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] DELETE /api/v1/folders/:id       --> github.com/archivus/archivus/internal/app/handlers.(*FolderHandler).DeleteFolder-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/folders/:id/tree  --> github.com/archivus/archivus/internal/app/handlers.(*FolderHandler).GetFolderTree-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/folders/:id/move  --> github.com/archivus/archivus/internal/app/handlers.(*FolderHandler).MoveFolder-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/folders/:id/documents --> github.com/archivus/archivus/internal/app/handlers.(*FolderHandler).GetFolderDocuments-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/tags              --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).CreateTag-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/tags              --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).ListTags-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/tags/:id          --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).GetTag-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] PUT    /api/v1/tags/:id          --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).UpdateTag-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] DELETE /api/v1/tags/:id          --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).DeleteTag-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/tags/popular      --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).GetPopularTags-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/tags/suggestions  --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).GetTagSuggestions-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/documents/:id/tags --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).GetDocumentTags-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/documents/:id/tags/generate --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).GenerateDocumentTags-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/documents/:id/tags --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).AddTagToDocument-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] DELETE /api/v1/documents/:id/tags/:tag_id --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).RemoveTagFromDocument-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/categories        --> github.com/archivus/archivus/internal/app/handlers.(*CategoryHandler).CreateCategory-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/categories        --> github.com/archivus/archivus/internal/app/handlers.(*CategoryHandler).ListCategories-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/categories/:id    --> github.com/archivus/archivus/internal/app/handlers.(*CategoryHandler).GetCategory-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] PUT    /api/v1/categories/:id    --> github.com/archivus/archivus/internal/app/handlers.(*CategoryHandler).UpdateCategory-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] DELETE /api/v1/categories/:id    --> github.com/archivus/archivus/internal/app/handlers.(*CategoryHandler).DeleteCategory-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/categories/system --> github.com/archivus/archivus/internal/app/handlers.(*CategoryHandler).GetSystemCategories-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/workflows         --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).CreateWorkflow-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/workflows         --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).ListWorkflows-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/workflows/:workflow_id --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).GetWorkflow-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] PUT    /api/v1/workflows/:workflow_id --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).UpdateWorkflow-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] DELETE /api/v1/workflows/:workflow_id --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).DeleteWorkflow-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/workflows/trigger/:document_id --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).TriggerWorkflow-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/workflows/document/:document_id --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).GetDocumentWorkflow-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/tasks             --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).GetUserTasks-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/tasks/pending     --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).GetPendingTasks-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/tasks/overdue     --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).GetOverdueTasks-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/tasks/:task_id/complete --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).CompleteTask-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/tasks/:task_id/delegate --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).DelegateTask-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/workflows/stats   --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).GetWorkflowStats-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/analytics/dashboard --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).GetDashboard-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/analytics/overview --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).GetDashboard-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/analytics/documents --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).GetDocumentAnalytics-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/analytics/users   --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).GetUserAnalytics-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/analytics/storage --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).GetStorageReport-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/analytics/compliance --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).GetComplianceReport-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/analytics/financial --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).GetFinancialReport-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/analytics/ai-processing --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).GetAIProcessingStats-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/analytics/export/csv --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).ExportAnalyticsCSV-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/analytics/export/xlsx --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).ExportAnalyticsExcel-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/analytics/export/pdf --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).ExportAnalyticsPDF-fm (10 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/subscription/status --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).GetSubscriptionStatus-fm (11 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/subscription/plans --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).GetAvailablePlans-fm (11 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/subscription/usage --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).GetUsageStats-fm (11 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /api/v1/subscription/summary --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).GetSubscriptionSummary-fm (11 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/subscription/checkout --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).CreateCheckoutSession-fm (11 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/subscription/portal --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).CreateCustomerPortal-fm (11 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/subscription/cancel --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).CancelSubscription-fm (11 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/subscription/reactivate --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).ReactivateSubscription-fm (11 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] POST   /api/v1/webhooks/stripe   --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).HandleStripeWebhook-fm (8 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /static/*filepath         --> github.com/gin-gonic/gin.(*RouterGroup).createStaticHandler.func1 (8 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] HEAD   /static/*filepath         --> github.com/gin-gonic/gin.(*RouterGroup).createStaticHandler.func1 (8 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /health/detailed          --> github.com/archivus/archivus/internal/app/server.(*Server).RegisterMonitoringRoutes.func1 (8 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /metrics                  --> github.com/archivus/archivus/internal/app/server.(*Server).RegisterMonitoringRoutes.func2 (8 handlers)
2025-07-05 00:35:06.745 | [GIN-debug] GET    /admin/rate-limits        --> github.com/archivus/archivus/internal/app/server.(*Server).RegisterMonitoringRoutes.func3 (8 handlers)
2025-07-05 00:35:06.745 | {"time":"2025-07-05T07:35:06.745897941Z","level":"INFO","msg":"Starting HTTP server in development mode"}
2025-07-05 00:35:06.746 | {"time":"2025-07-05T07:35:06.746048694Z","level":"INFO","msg":"Starting HTTP server","port":"8080"}
2025-07-05 00:35:15.848 | ::1 - [Sat, 05 Jul 2025 07:35:15 UTC] "GET /health HTTP/1.1 200 5.84446ms "Wget" "
2025-07-05 00:35:16.307 | {"time":"2025-07-05T07:35:16.307512515Z","level":"INFO","msg":"OPTIONS preflight request","origin":"http://localhost:3000","allowed":true,"allowedOrigins":["http://localhost:3000","http://localhost:3001"],"environment":"development"}
2025-07-05 00:35:30.144 | 172.20.0.1 - [Sat, 05 Jul 2025 07:35:30 UTC] "POST /api/v1/auth/login HTTP/1.1 400 1.547779ms "curl/8.5.0" "
2025-07-05 00:35:41.147 | 172.20.0.1 - [Sat, 05 Jul 2025 07:35:41 UTC] "POST /api/v1/auth/login HTTP/1.1 401 879.704937ms "curl/8.5.0" "
2025-07-05 00:35:47.260 | ::1 - [Sat, 05 Jul 2025 07:35:47 UTC] "GET /health HTTP/1.1 200 656.742µs "Wget" "
2025-07-05 00:36:18.697 | ::1 - [Sat, 05 Jul 2025 07:36:18 UTC] "GET /health HTTP/1.1 200 5.823478ms "Wget" "
2025-07-05 00:36:50.133 | ::1 - [Sat, 05 Jul 2025 07:36:50 UTC] "GET /health HTTP/1.1 200 698.595µs "Wget" "
2025-07-06 19:23:35.462 | {"time":"2025-07-07T02:23:35.461739411Z","level":"INFO","msg":"Starting Archivus DMS","environment":"development","port":"8080"}
2025-07-06 19:23:35.463 | {"time":"2025-07-07T02:23:35.462620703Z","level":"INFO","msg":"Connecting to database","url":"postgresql://postgres:Y5HK4_.D5Cc7v.y@db.ulnisgaeijkspqambdlh.supabase.co:5432/postgres"}
2025-07-06 19:23:36.176 | 
2025-07-06 19:23:36.176 | 2025/07/07 02:23:36 /app/internal/infrastructure/database/database.go:99
2025-07-06 19:23:36.176 | [175.849ms] [rows:0] CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
2025-07-06 19:23:36.293 | 
2025-07-06 19:23:36.293 | 2025/07/07 02:23:36 /app/internal/infrastructure/database/database.go:99
2025-07-06 19:23:36.293 | [116.576ms] [rows:0] CREATE EXTENSION IF NOT EXISTS "vector"
2025-07-06 19:23:36.357 | {"time":"2025-07-07T02:23:36.356328009Z","level":"INFO","msg":"Running database migrations..."}
2025-07-06 19:23:36.514 | 
2025-07-06 19:23:36.514 | 2025/07/07 02:23:36 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:36.514 | [145.380ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND table_type = 'BASE TABLE'
2025-07-06 19:23:36.623 | 
2025-07-06 19:23:36.623 | 2025/07/07 02:23:36 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:36.623 | [109.280ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:36.801 | 
2025-07-06 19:23:36.801 | 2025/07/07 02:23:36 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:36.801 | [174.898ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'tenants'
2025-07-06 19:23:36.914 | 
2025-07-06 19:23:36.914 | 2025/07/07 02:23:36 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:36.914 | [115.117ms] [rows:-] SELECT * FROM "tenants" LIMIT 1
2025-07-06 19:23:37.062 | 
2025-07-06 19:23:37.062 | 2025/07/07 02:23:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:37.062 | [148.522ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'tenants' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:37.179 | 
2025-07-06 19:23:37.179 | 2025/07/07 02:23:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:37.179 | [116.804ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'tenants'
2025-07-06 19:23:37.284 | 
2025-07-06 19:23:37.284 | 2025/07/07 02:23:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:37.284 | [104.362ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:23:37.284 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:23:37.284 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:23:37.284 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:23:37.284 | 		AND b.relname = 'tenants'
2025-07-06 19:23:37.398 | 
2025-07-06 19:23:37.398 | 2025/07/07 02:23:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:37.398 | [114.089ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:37.451 | 
2025-07-06 19:23:37.451 | 2025/07/07 02:23:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:37.451 | [52.351ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:37.504 | 
2025-07-06 19:23:37.504 | 2025/07/07 02:23:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:37.504 | [53.595ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'subdomain') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:37.558 | 
2025-07-06 19:23:37.558 | 2025/07/07 02:23:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:37.558 | [53.311ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'subscription_tier') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:37.623 | 
2025-07-06 19:23:37.623 | 2025/07/07 02:23:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:37.623 | [65.133ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'storage_quota') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:37.679 | 
2025-07-06 19:23:37.679 | 2025/07/07 02:23:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:37.679 | [55.702ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'storage_used') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:37.735 | 
2025-07-06 19:23:37.735 | 2025/07/07 02:23:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:37.735 | [55.740ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'api_quota') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:37.788 | 
2025-07-06 19:23:37.788 | 2025/07/07 02:23:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:37.788 | [53.522ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'api_used') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:37.849 | 
2025-07-06 19:23:37.849 | 2025/07/07 02:23:37 
2025-07-06 19:23:37.849 | [60.572ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:37.915 | 
2025-07-06 19:23:37.915 | 2025/07/07 02:23:37 
2025-07-06 19:23:37.915 | [66.176ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'tenants'
2025-07-06 19:23:37.976 | 
2025-07-06 19:23:37.976 | 2025/07/07 02:23:37 
2025-07-06 19:23:37.976 | [60.606ms] [rows:-] SELECT * FROM "tenants" LIMIT 1
2025-07-06 19:23:38.049 | 
2025-07-06 19:23:38.049 | 2025/07/07 02:23:38 
2025-07-06 19:23:38.049 | [72.577ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'tenants' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:38.119 | 
2025-07-06 19:23:38.119 | 2025/07/07 02:23:38 
2025-07-06 19:23:38.119 | [70.258ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'tenants'
2025-07-06 19:23:38.179 | 
2025-07-06 19:23:38.179 | 2025/07/07 02:23:38 
2025-07-06 19:23:38.179 | [59.850ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:23:38.179 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:23:38.179 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:23:38.179 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:23:38.179 | 		AND b.relname = 'tenants'
2025-07-06 19:23:38.311 | 
2025-07-06 19:23:38.311 | 2025/07/07 02:23:38 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:38.311 | [131.205ms] [rows:0] ALTER TABLE "tenants" ALTER COLUMN "settings" SET DEFAULT '{}'
2025-07-06 19:23:39.001 | 
2025-07-06 19:23:39.001 | 2025/07/07 02:23:39 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:23:39.001 | [690.344ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'settings') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:39.054 | 
2025-07-06 19:23:39.054 | 2025/07/07 02:23:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:39.054 | [52.531ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'is_active') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:39.107 | 
2025-07-06 19:23:39.107 | 2025/07/07 02:23:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:39.107 | [52.744ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'trial_ends_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:39.159 | 
2025-07-06 19:23:39.159 | 2025/07/07 02:23:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:39.159 | [52.341ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'business_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:39.211 | 
2025-07-06 19:23:39.212 | 2025/07/07 02:23:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:39.212 | [52.299ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'industry') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:39.264 | 
2025-07-06 19:23:39.264 | 2025/07/07 02:23:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:39.264 | [52.844ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'company_size') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:39.315 | 
2025-07-06 19:23:39.315 | 2025/07/07 02:23:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:39.315 | [50.423ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'tax_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:39.367 | 
2025-07-06 19:23:39.367 | 2025/07/07 02:23:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:39.367 | [51.536ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'address') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:39.418 | 
2025-07-06 19:23:39.418 | 2025/07/07 02:23:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:39.418 | [51.155ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'retention_policy') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:39.469 | 
2025-07-06 19:23:39.469 | 2025/07/07 02:23:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:39.469 | [51.229ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'compliance_rules') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:39.521 | 
2025-07-06 19:23:39.521 | 2025/07/07 02:23:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:39.521 | [51.020ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:39.572 | 
2025-07-06 19:23:39.572 | 2025/07/07 02:23:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:39.572 | [51.010ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tenants' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tenants' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:39.673 | 
2025-07-06 19:23:39.673 | 2025/07/07 02:23:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:39.673 | [101.604ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND table_type = 'BASE TABLE'
2025-07-06 19:23:39.775 | 
2025-07-06 19:23:39.775 | 2025/07/07 02:23:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:39.775 | [101.349ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:39.885 | 
2025-07-06 19:23:39.885 | 2025/07/07 02:23:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:39.885 | [109.523ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'users'
2025-07-06 19:23:40.003 | 
2025-07-06 19:23:40.003 | 2025/07/07 02:23:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:40.003 | [118.674ms] [rows:-] SELECT * FROM "users" LIMIT 1
2025-07-06 19:23:40.120 | 
2025-07-06 19:23:40.120 | 2025/07/07 02:23:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:40.120 | [116.561ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'users' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:40.234 | 
2025-07-06 19:23:40.234 | 2025/07/07 02:23:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:40.234 | [113.640ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'users'
2025-07-06 19:23:40.340 | 
2025-07-06 19:23:40.340 | 2025/07/07 02:23:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:40.340 | [106.249ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:23:40.340 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:23:40.340 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:23:40.340 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:23:40.340 | 		AND b.relname = 'users'
2025-07-06 19:23:40.393 | 
2025-07-06 19:23:40.394 | 2025/07/07 02:23:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:40.394 | [53.147ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:40.444 | 
2025-07-06 19:23:40.444 | 2025/07/07 02:23:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:40.444 | [50.986ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:40.495 | 
2025-07-06 19:23:40.495 | 2025/07/07 02:23:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:40.495 | [49.993ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'email') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:40.546 | 
2025-07-06 19:23:40.546 | 2025/07/07 02:23:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:40.546 | [51.218ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'password_hash') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:40.596 | 
2025-07-06 19:23:40.596 | 2025/07/07 02:23:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:40.596 | [50.139ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'first_name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:40.647 | 
2025-07-06 19:23:40.647 | 2025/07/07 02:23:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:40.647 | [50.751ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'last_name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:40.697 | 
2025-07-06 19:23:40.698 | 2025/07/07 02:23:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:40.698 | [50.372ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'role') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:40.748 | 
2025-07-06 19:23:40.748 | 2025/07/07 02:23:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:40.748 | [50.352ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'department') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:40.799 | 
2025-07-06 19:23:40.799 | 2025/07/07 02:23:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:40.799 | [51.075ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'job_title') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:40.850 | 
2025-07-06 19:23:40.850 | 2025/07/07 02:23:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:40.850 | [51.102ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'is_active') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:40.902 | 
2025-07-06 19:23:40.903 | 2025/07/07 02:23:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:40.903 | [52.020ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'email_verified') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:40.953 | 
2025-07-06 19:23:40.953 | 2025/07/07 02:23:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:40.953 | [50.776ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'last_login_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:41.019 | 
2025-07-06 19:23:41.019 | 2025/07/07 02:23:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:41.019 | [65.704ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'password_changed_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:41.070 | 
2025-07-06 19:23:41.070 | 2025/07/07 02:23:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:41.070 | [51.225ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'mfa_enabled') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:41.122 | 
2025-07-06 19:23:41.122 | 2025/07/07 02:23:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:41.122 | [51.061ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'mfa_secret') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:41.173 | 
2025-07-06 19:23:41.173 | 2025/07/07 02:23:41 
2025-07-06 19:23:41.173 | [50.994ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:41.230 | 
2025-07-06 19:23:41.230 | 2025/07/07 02:23:41 
2025-07-06 19:23:41.230 | [57.536ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'users'
2025-07-06 19:23:41.286 | 
2025-07-06 19:23:41.286 | 2025/07/07 02:23:41 
2025-07-06 19:23:41.286 | [55.169ms] [rows:-] SELECT * FROM "users" LIMIT 1
2025-07-06 19:23:41.350 | 
2025-07-06 19:23:41.350 | 2025/07/07 02:23:41 
2025-07-06 19:23:41.350 | [64.310ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'users' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:41.413 | 
2025-07-06 19:23:41.413 | 2025/07/07 02:23:41 
2025-07-06 19:23:41.413 | [62.943ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'users'
2025-07-06 19:23:41.464 | 
2025-07-06 19:23:41.464 | 2025/07/07 02:23:41 
2025-07-06 19:23:41.464 | [50.936ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:23:41.464 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:23:41.464 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:23:41.464 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:23:41.464 | 		AND b.relname = 'users'
2025-07-06 19:23:41.570 | 
2025-07-06 19:23:41.570 | 2025/07/07 02:23:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:41.570 | [105.146ms] [rows:0] ALTER TABLE "users" ALTER COLUMN "preferences" SET DEFAULT '{}'
2025-07-06 19:23:42.131 | 
2025-07-06 19:23:42.131 | 2025/07/07 02:23:42 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:23:42.131 | [561.442ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'preferences') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:42.233 | 
2025-07-06 19:23:42.233 | 2025/07/07 02:23:42 
2025-07-06 19:23:42.233 | [101.913ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:42.349 | 
2025-07-06 19:23:42.349 | 2025/07/07 02:23:42 
2025-07-06 19:23:42.349 | [115.221ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'users'
2025-07-06 19:23:42.454 | 
2025-07-06 19:23:42.455 | 2025/07/07 02:23:42 
2025-07-06 19:23:42.455 | [105.719ms] [rows:-] SELECT * FROM "users" LIMIT 1
2025-07-06 19:23:42.573 | 
2025-07-06 19:23:42.573 | 2025/07/07 02:23:42 
2025-07-06 19:23:42.573 | [118.000ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'users' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:42.687 | 
2025-07-06 19:23:42.687 | 2025/07/07 02:23:42 
2025-07-06 19:23:42.687 | [114.710ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'users'
2025-07-06 19:23:42.789 | 
2025-07-06 19:23:42.789 | 2025/07/07 02:23:42 
2025-07-06 19:23:42.789 | [101.729ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:23:42.789 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:23:42.789 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:23:42.789 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:23:42.789 | 		AND b.relname = 'users'
2025-07-06 19:23:42.894 | 
2025-07-06 19:23:42.894 | 2025/07/07 02:23:42 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:42.894 | [104.461ms] [rows:0] ALTER TABLE "users" ALTER COLUMN "notification_settings" SET DEFAULT '{}'
2025-07-06 19:23:43.409 | 
2025-07-06 19:23:43.409 | 2025/07/07 02:23:43 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:23:43.409 | [514.747ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'notification_settings') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:43.462 | 
2025-07-06 19:23:43.462 | 2025/07/07 02:23:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:43.462 | [53.066ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:43.515 | 
2025-07-06 19:23:43.515 | 2025/07/07 02:23:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:43.515 | [52.625ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'users' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:43.618 | 
2025-07-06 19:23:43.618 | 2025/07/07 02:23:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:43.618 | [103.452ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'users' AND constraint_name = 'fk_tenants_users'
2025-07-06 19:23:43.724 | 
2025-07-06 19:23:43.724 | 2025/07/07 02:23:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:43.724 | [105.599ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'users' AND indexname = 'idx_users_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:23:43.776 | 
2025-07-06 19:23:43.776 | 2025/07/07 02:23:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:43.776 | [52.267ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'users' AND indexname = 'idx_users_email' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:23:43.879 | 
2025-07-06 19:23:43.879 | 2025/07/07 02:23:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:43.879 | [102.398ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND table_type = 'BASE TABLE'
2025-07-06 19:23:43.982 | 
2025-07-06 19:23:43.982 | 2025/07/07 02:23:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:43.982 | [103.181ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:44.091 | 
2025-07-06 19:23:44.091 | 2025/07/07 02:23:44 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:44.091 | [108.486ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'folders'
2025-07-06 19:23:44.199 | 
2025-07-06 19:23:44.199 | 2025/07/07 02:23:44 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:44.199 | [108.395ms] [rows:-] SELECT * FROM "folders" LIMIT 1
2025-07-06 19:23:44.308 | 
2025-07-06 19:23:44.308 | 2025/07/07 02:23:44 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:44.308 | [108.733ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'folders' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:44.417 | 
2025-07-06 19:23:44.417 | 2025/07/07 02:23:44 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:44.417 | [108.980ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'folders'
2025-07-06 19:23:44.520 | 
2025-07-06 19:23:44.520 | 2025/07/07 02:23:44 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:44.520 | [102.451ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:23:44.520 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:23:44.520 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:23:44.520 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:23:44.520 | 		AND b.relname = 'folders'
2025-07-06 19:23:44.573 | 
2025-07-06 19:23:44.573 | 2025/07/07 02:23:44 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:44.573 | [52.937ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:44.625 | 
2025-07-06 19:23:44.625 | 2025/07/07 02:23:44 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:44.625 | [52.433ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:44.678 | 
2025-07-06 19:23:44.678 | 2025/07/07 02:23:44 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:44.678 | [52.834ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'parent_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:44.737 | 
2025-07-06 19:23:44.737 | 2025/07/07 02:23:44 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:44.737 | [58.695ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:44.790 | 
2025-07-06 19:23:44.790 | 2025/07/07 02:23:44 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:44.790 | [53.513ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'description') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:44.848 | 
2025-07-06 19:23:44.848 | 2025/07/07 02:23:44 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:44.848 | [56.946ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'path') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:44.906 | 
2025-07-06 19:23:44.906 | 2025/07/07 02:23:44 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:44.906 | [58.227ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'level') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:44.961 | 
2025-07-06 19:23:44.961 | 2025/07/07 02:23:44 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:44.961 | [54.672ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'is_system') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:45.013 | 
2025-07-06 19:23:45.013 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.013 | [51.841ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'color') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:45.066 | 
2025-07-06 19:23:45.066 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.066 | [53.175ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'icon') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:45.117 | 
2025-07-06 19:23:45.117 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.117 | [50.821ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'created_by') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:45.168 | 
2025-07-06 19:23:45.168 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.168 | [51.075ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:45.219 | 
2025-07-06 19:23:45.219 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.219 | [50.926ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'folders' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:45.271 | 
2025-07-06 19:23:45.271 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.271 | [51.612ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND constraint_name = 'fk_folders_children'
2025-07-06 19:23:45.323 | 
2025-07-06 19:23:45.323 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.323 | [51.885ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND constraint_name = 'fk_users_created_folders'
2025-07-06 19:23:45.375 | 
2025-07-06 19:23:45.375 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.375 | [51.805ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'folders' AND constraint_name = 'fk_tenants_folders'
2025-07-06 19:23:45.426 | 
2025-07-06 19:23:45.426 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.426 | [51.561ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'folders' AND indexname = 'idx_tenant_folder_path' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:23:45.477 | 
2025-07-06 19:23:45.477 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.477 | [51.003ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'folders' AND indexname = 'idx_folders_parent_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:23:45.528 | 
2025-07-06 19:23:45.528 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.528 | [51.012ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'folders' AND indexname = 'idx_folders_created_by' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:23:45.579 | 
2025-07-06 19:23:45.579 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.579 | [50.958ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND table_type = 'BASE TABLE'
2025-07-06 19:23:45.630 | 
2025-07-06 19:23:45.630 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.630 | [50.260ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:45.686 | 
2025-07-06 19:23:45.686 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.686 | [56.062ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'categories'
2025-07-06 19:23:45.792 | 
2025-07-06 19:23:45.792 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.792 | [106.082ms] [rows:-] SELECT * FROM "categories" LIMIT 1
2025-07-06 19:23:45.855 | 
2025-07-06 19:23:45.855 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.855 | [62.738ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'categories' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:45.912 | 
2025-07-06 19:23:45.912 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.912 | [56.729ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'categories'
2025-07-06 19:23:45.964 | 
2025-07-06 19:23:45.964 | 2025/07/07 02:23:45 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:45.964 | [51.674ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:23:45.964 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:23:45.964 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:23:45.964 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:23:45.964 | 		AND b.relname = 'categories'
2025-07-06 19:23:46.015 | 
2025-07-06 19:23:46.015 | 2025/07/07 02:23:46 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:46.015 | [50.935ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:46.071 | 
2025-07-06 19:23:46.071 | 2025/07/07 02:23:46 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:46.071 | [56.435ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:46.125 | 
2025-07-06 19:23:46.125 | 2025/07/07 02:23:46 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:46.125 | [53.774ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:46.180 | 
2025-07-06 19:23:46.180 | 2025/07/07 02:23:46 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:46.180 | [55.114ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'description') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:46.231 | 
2025-07-06 19:23:46.231 | 2025/07/07 02:23:46 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:46.231 | [50.471ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'color') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:46.282 | 
2025-07-06 19:23:46.282 | 2025/07/07 02:23:46 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:46.282 | [51.235ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'icon') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:46.333 | 
2025-07-06 19:23:46.333 | 2025/07/07 02:23:46 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:46.333 | [50.833ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'is_system') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:46.385 | 
2025-07-06 19:23:46.385 | 2025/07/07 02:23:46 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:46.385 | [51.279ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'sort_order') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:46.436 | 
2025-07-06 19:23:46.436 | 2025/07/07 02:23:46 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:46.436 | [51.521ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:46.489 | 
2025-07-06 19:23:46.489 | 2025/07/07 02:23:46 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:46.489 | [52.098ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'categories' AND constraint_name = 'fk_tenants_categories'
2025-07-06 19:23:46.539 | 
2025-07-06 19:23:46.539 | 2025/07/07 02:23:46 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:46.539 | [50.818ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'categories' AND indexname = 'idx_categories_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:23:46.591 | 
2025-07-06 19:23:46.591 | 2025/07/07 02:23:46 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:46.591 | [51.070ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'categories' AND indexname = 'idx_tenant_category_name' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:23:46.641 | 
2025-07-06 19:23:46.641 | 2025/07/07 02:23:46 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:46.642 | [50.840ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND table_type = 'BASE TABLE'
2025-07-06 19:23:46.691 | 
2025-07-06 19:23:46.691 | 2025/07/07 02:23:46 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:46.691 | [49.432ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:46.753 | 
2025-07-06 19:23:46.753 | 2025/07/07 02:23:46 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:46.753 | [61.431ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-06 19:23:46.927 | 
2025-07-06 19:23:46.927 | 2025/07/07 02:23:46 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:46.927 | [174.197ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-06 19:23:47.032 | 
2025-07-06 19:23:47.032 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.032 | [104.222ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:47.135 | 
2025-07-06 19:23:47.135 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.136 | [103.346ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-06 19:23:47.187 | 
2025-07-06 19:23:47.187 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.187 | [51.535ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:23:47.187 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:23:47.187 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:23:47.187 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:23:47.187 | 		AND b.relname = 'documents'
2025-07-06 19:23:47.242 | 
2025-07-06 19:23:47.242 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.242 | [54.688ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:47.292 | 
2025-07-06 19:23:47.293 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.293 | [50.674ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:47.344 | 
2025-07-06 19:23:47.344 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.344 | [51.183ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'folder_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:47.395 | 
2025-07-06 19:23:47.395 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.395 | [51.042ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'file_name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:47.446 | 
2025-07-06 19:23:47.446 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.446 | [51.250ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'original_name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:47.497 | 
2025-07-06 19:23:47.497 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.498 | [51.048ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'content_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:47.548 | 
2025-07-06 19:23:47.548 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.548 | [50.830ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'file_size') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:47.600 | 
2025-07-06 19:23:47.600 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.600 | [50.867ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'storage_path') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:47.650 | 
2025-07-06 19:23:47.651 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.651 | [50.826ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'thumbnail_path') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:47.705 | 
2025-07-06 19:23:47.705 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.705 | [54.590ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'preview_path') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:47.756 | 
2025-07-06 19:23:47.756 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.756 | [50.283ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'extracted_text') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:47.806 | 
2025-07-06 19:23:47.806 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.806 | [50.164ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'content_hash') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:47.856 | 
2025-07-06 19:23:47.856 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.856 | [50.171ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'ocr_text') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:47.907 | 
2025-07-06 19:23:47.907 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.907 | [51.131ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'summary') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:47.959 | 
2025-07-06 19:23:47.959 | 2025/07/07 02:23:47 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:47.959 | [51.281ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'ai_confidence') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:48.012 | 
2025-07-06 19:23:48.012 | 2025/07/07 02:23:48 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:48.012 | [52.980ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'embedding') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:48.062 | 
2025-07-06 19:23:48.062 | 2025/07/07 02:23:48 
2025-07-06 19:23:48.062 | [50.434ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:48.124 | 
2025-07-06 19:23:48.124 | 2025/07/07 02:23:48 
2025-07-06 19:23:48.124 | [61.530ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-06 19:23:48.179 | 
2025-07-06 19:23:48.179 | 2025/07/07 02:23:48 
2025-07-06 19:23:48.179 | [54.668ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-06 19:23:48.285 | 
2025-07-06 19:23:48.285 | 2025/07/07 02:23:48 
2025-07-06 19:23:48.285 | [106.002ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:48.389 | 
2025-07-06 19:23:48.389 | 2025/07/07 02:23:48 
2025-07-06 19:23:48.389 | [103.558ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-06 19:23:48.440 | 
2025-07-06 19:23:48.440 | 2025/07/07 02:23:48 
2025-07-06 19:23:48.440 | [51.530ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:23:48.440 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:23:48.440 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:23:48.440 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:23:48.440 | 		AND b.relname = 'documents'
2025-07-06 19:23:49.156 | 
2025-07-06 19:23:49.156 | 2025/07/07 02:23:49 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:23:49.156 | [715.390ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'normalized_text') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:49.209 | 
2025-07-06 19:23:49.209 | 2025/07/07 02:23:49 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:49.209 | [52.596ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_extraction_status') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:49.310 | 
2025-07-06 19:23:49.310 | 2025/07/07 02:23:49 
2025-07-06 19:23:49.310 | [101.429ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:49.421 | 
2025-07-06 19:23:49.421 | 2025/07/07 02:23:49 
2025-07-06 19:23:49.421 | [111.086ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-06 19:23:49.532 | 
2025-07-06 19:23:49.532 | 2025/07/07 02:23:49 
2025-07-06 19:23:49.532 | [110.359ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-06 19:23:49.689 | 
2025-07-06 19:23:49.689 | 2025/07/07 02:23:49 
2025-07-06 19:23:49.689 | [156.312ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:49.840 | 
2025-07-06 19:23:49.840 | 2025/07/07 02:23:49 
2025-07-06 19:23:49.840 | [151.684ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-06 19:23:49.942 | 
2025-07-06 19:23:49.942 | 2025/07/07 02:23:49 
2025-07-06 19:23:49.942 | [101.807ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:23:49.942 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:23:49.942 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:23:49.942 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:23:49.942 | 		AND b.relname = 'documents'
2025-07-06 19:23:50.409 | 
2025-07-06 19:23:50.409 | 2025/07/07 02:23:50 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:23:50.409 | [466.972ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_extraction_error') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:50.510 | 
2025-07-06 19:23:50.510 | 2025/07/07 02:23:50 
2025-07-06 19:23:50.510 | [100.478ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:50.621 | 
2025-07-06 19:23:50.621 | 2025/07/07 02:23:50 
2025-07-06 19:23:50.621 | [110.956ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-06 19:23:50.731 | 
2025-07-06 19:23:50.731 | 2025/07/07 02:23:50 
2025-07-06 19:23:50.731 | [110.058ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-06 19:23:50.888 | 
2025-07-06 19:23:50.888 | 2025/07/07 02:23:50 
2025-07-06 19:23:50.888 | [156.203ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:51.057 | 
2025-07-06 19:23:51.057 | 2025/07/07 02:23:51 
2025-07-06 19:23:51.057 | [169.089ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-06 19:23:51.173 | 
2025-07-06 19:23:51.173 | 2025/07/07 02:23:51 
2025-07-06 19:23:51.173 | [116.484ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:23:51.173 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:23:51.173 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:23:51.173 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:23:51.173 | 		AND b.relname = 'documents'
2025-07-06 19:23:51.319 | 
2025-07-06 19:23:51.320 | 2025/07/07 02:23:51 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:51.320 | [145.842ms] [rows:0] ALTER TABLE "documents" ALTER COLUMN "text_extraction_method" TYPE varchar(20) USING "text_extraction_method"::varchar(20)
2025-07-06 19:23:51.877 | 
2025-07-06 19:23:51.877 | 2025/07/07 02:23:51 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:23:51.877 | [557.230ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_extraction_method') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:51.978 | 
2025-07-06 19:23:51.978 | 2025/07/07 02:23:51 
2025-07-06 19:23:51.978 | [101.176ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:52.089 | 
2025-07-06 19:23:52.089 | 2025/07/07 02:23:52 
2025-07-06 19:23:52.089 | [111.199ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-06 19:23:52.201 | 
2025-07-06 19:23:52.201 | 2025/07/07 02:23:52 
2025-07-06 19:23:52.201 | [111.335ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-06 19:23:52.357 | 
2025-07-06 19:23:52.357 | 2025/07/07 02:23:52 
2025-07-06 19:23:52.357 | [156.270ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:52.511 | 
2025-07-06 19:23:52.511 | 2025/07/07 02:23:52 
2025-07-06 19:23:52.511 | [153.563ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-06 19:23:52.614 | 
2025-07-06 19:23:52.614 | 2025/07/07 02:23:52 
2025-07-06 19:23:52.614 | [102.546ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:23:52.614 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:23:52.614 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:23:52.614 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:23:52.614 | 		AND b.relname = 'documents'
2025-07-06 19:23:53.075 | 
2025-07-06 19:23:53.075 | 2025/07/07 02:23:53 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:23:53.075 | [460.649ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_quality') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:53.176 | 
2025-07-06 19:23:53.176 | 2025/07/07 02:23:53 
2025-07-06 19:23:53.176 | [101.540ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:53.287 | 
2025-07-06 19:23:53.287 | 2025/07/07 02:23:53 
2025-07-06 19:23:53.287 | [110.637ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-06 19:23:53.398 | 
2025-07-06 19:23:53.398 | 2025/07/07 02:23:53 
2025-07-06 19:23:53.398 | [110.468ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-06 19:23:53.554 | 
2025-07-06 19:23:53.554 | 2025/07/07 02:23:53 
2025-07-06 19:23:53.554 | [155.919ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:53.705 | 
2025-07-06 19:23:53.705 | 2025/07/07 02:23:53 
2025-07-06 19:23:53.705 | [151.404ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-06 19:23:53.807 | 
2025-07-06 19:23:53.807 | 2025/07/07 02:23:53 
2025-07-06 19:23:53.807 | [101.412ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:23:53.807 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:23:53.807 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:23:53.807 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:23:53.807 | 		AND b.relname = 'documents'
2025-07-06 19:23:53.913 | 
2025-07-06 19:23:53.913 | 2025/07/07 02:23:53 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:23:53.914 | [106.622ms] [rows:0] ALTER TABLE "documents" ALTER COLUMN "text_language" TYPE varchar(10) USING "text_language"::varchar(10)
2025-07-06 19:23:54.425 | 
2025-07-06 19:23:54.425 | 2025/07/07 02:23:54 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:23:54.425 | [511.185ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_language') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:54.525 | 
2025-07-06 19:23:54.525 | 2025/07/07 02:23:54 
2025-07-06 19:23:54.525 | [99.992ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:54.637 | 
2025-07-06 19:23:54.637 | 2025/07/07 02:23:54 
2025-07-06 19:23:54.637 | [112.094ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-06 19:23:54.747 | 
2025-07-06 19:23:54.747 | 2025/07/07 02:23:54 
2025-07-06 19:23:54.747 | [109.865ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-06 19:23:54.906 | 
2025-07-06 19:23:54.906 | 2025/07/07 02:23:54 
2025-07-06 19:23:54.906 | [158.128ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:55.058 | 
2025-07-06 19:23:55.058 | 2025/07/07 02:23:55 
2025-07-06 19:23:55.058 | [152.633ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-06 19:23:55.160 | 
2025-07-06 19:23:55.160 | 2025/07/07 02:23:55 
2025-07-06 19:23:55.160 | [101.358ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:23:55.160 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:23:55.160 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:23:55.160 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:23:55.160 | 		AND b.relname = 'documents'
2025-07-06 19:23:55.616 | 
2025-07-06 19:23:55.616 | 2025/07/07 02:23:55 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:23:55.616 | [456.779ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_word_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:55.716 | 
2025-07-06 19:23:55.716 | 2025/07/07 02:23:55 
2025-07-06 19:23:55.716 | [99.582ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:55.829 | 
2025-07-06 19:23:55.829 | 2025/07/07 02:23:55 
2025-07-06 19:23:55.829 | [112.176ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-06 19:23:55.938 | 
2025-07-06 19:23:55.938 | 2025/07/07 02:23:55 
2025-07-06 19:23:55.938 | [107.559ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-06 19:23:56.093 | 
2025-07-06 19:23:56.093 | 2025/07/07 02:23:56 
2025-07-06 19:23:56.093 | [154.937ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:56.244 | 
2025-07-06 19:23:56.244 | 2025/07/07 02:23:56 
2025-07-06 19:23:56.244 | [150.765ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-06 19:23:56.348 | 
2025-07-06 19:23:56.348 | 2025/07/07 02:23:56 
2025-07-06 19:23:56.348 | [103.364ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:23:56.348 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:23:56.348 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:23:56.348 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:23:56.348 | 		AND b.relname = 'documents'
2025-07-06 19:23:56.808 | 
2025-07-06 19:23:56.808 | 2025/07/07 02:23:56 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:23:56.808 | [460.476ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_char_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:56.909 | 
2025-07-06 19:23:56.909 | 2025/07/07 02:23:56 
2025-07-06 19:23:56.909 | [101.098ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:57.024 | 
2025-07-06 19:23:57.024 | 2025/07/07 02:23:57 
2025-07-06 19:23:57.024 | [114.705ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-06 19:23:57.130 | 
2025-07-06 19:23:57.130 | 2025/07/07 02:23:57 
2025-07-06 19:23:57.130 | [105.289ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-06 19:23:57.286 | 
2025-07-06 19:23:57.286 | 2025/07/07 02:23:57 
2025-07-06 19:23:57.286 | [155.941ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:57.437 | 
2025-07-06 19:23:57.437 | 2025/07/07 02:23:57 
2025-07-06 19:23:57.437 | [151.497ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-06 19:23:57.540 | 
2025-07-06 19:23:57.540 | 2025/07/07 02:23:57 
2025-07-06 19:23:57.540 | [102.999ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:23:57.540 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:23:57.540 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:23:57.540 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:23:57.540 | 		AND b.relname = 'documents'
2025-07-06 19:23:58.112 | 
2025-07-06 19:23:58.112 | 2025/07/07 02:23:58 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:23:58.112 | [571.005ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_extraction_time_ms') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:58.215 | 
2025-07-06 19:23:58.215 | 2025/07/07 02:23:58 
2025-07-06 19:23:58.215 | [103.274ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:58.326 | 
2025-07-06 19:23:58.326 | 2025/07/07 02:23:58 
2025-07-06 19:23:58.326 | [111.202ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-06 19:23:58.437 | 
2025-07-06 19:23:58.437 | 2025/07/07 02:23:58 
2025-07-06 19:23:58.437 | [110.108ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-06 19:23:58.591 | 
2025-07-06 19:23:58.591 | 2025/07/07 02:23:58 
2025-07-06 19:23:58.591 | [154.017ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:58.742 | 
2025-07-06 19:23:58.742 | 2025/07/07 02:23:58 
2025-07-06 19:23:58.742 | [151.360ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-06 19:23:58.843 | 
2025-07-06 19:23:58.843 | 2025/07/07 02:23:58 
2025-07-06 19:23:58.843 | [100.580ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:23:58.843 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:23:58.843 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:23:58.843 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:23:58.843 | 		AND b.relname = 'documents'
2025-07-06 19:23:59.302 | 
2025-07-06 19:23:59.302 | 2025/07/07 02:23:59 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:23:59.302 | [458.807ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'text_extracted_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:23:59.402 | 
2025-07-06 19:23:59.402 | 2025/07/07 02:23:59 
2025-07-06 19:23:59.402 | [100.130ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:23:59.514 | 
2025-07-06 19:23:59.514 | 2025/07/07 02:23:59 
2025-07-06 19:23:59.514 | [111.913ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-06 19:23:59.623 | 
2025-07-06 19:23:59.623 | 2025/07/07 02:23:59 
2025-07-06 19:23:59.623 | [108.957ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-06 19:23:59.780 | 
2025-07-06 19:23:59.780 | 2025/07/07 02:23:59 
2025-07-06 19:23:59.780 | [156.224ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-06 19:23:59.930 | 
2025-07-06 19:23:59.931 | 2025/07/07 02:23:59 
2025-07-06 19:23:59.931 | [150.729ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-06 19:24:00.033 | 
2025-07-06 19:24:00.033 | 2025/07/07 02:24:00 
2025-07-06 19:24:00.033 | [102.003ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:00.033 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:00.033 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:00.033 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:00.033 | 		AND b.relname = 'documents'
2025-07-06 19:24:00.504 | 
2025-07-06 19:24:00.504 | 2025/07/07 02:24:00 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:24:00.504 | [470.758ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'ai_summary') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:00.604 | 
2025-07-06 19:24:00.604 | 2025/07/07 02:24:00 
2025-07-06 19:24:00.604 | [100.842ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:00.716 | 
2025-07-06 19:24:00.716 | 2025/07/07 02:24:00 
2025-07-06 19:24:00.716 | [111.516ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-06 19:24:00.826 | 
2025-07-06 19:24:00.826 | 2025/07/07 02:24:00 
2025-07-06 19:24:00.826 | [109.424ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-06 19:24:00.979 | 
2025-07-06 19:24:00.979 | 2025/07/07 02:24:00 
2025-07-06 19:24:00.979 | [153.143ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:01.131 | 
2025-07-06 19:24:01.131 | 2025/07/07 02:24:01 
2025-07-06 19:24:01.131 | [151.822ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-06 19:24:01.233 | 
2025-07-06 19:24:01.234 | 2025/07/07 02:24:01 
2025-07-06 19:24:01.234 | [102.372ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:01.234 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:01.234 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:01.234 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:01.234 | 		AND b.relname = 'documents'
2025-07-06 19:24:01.654 | 
2025-07-06 19:24:01.655 | 2025/07/07 02:24:01 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:24:01.655 | [455.966ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'ai_key_points') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:01.754 | 
2025-07-06 19:24:01.754 | 2025/07/07 02:24:01 
2025-07-06 19:24:01.754 | [99.506ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:01.867 | 
2025-07-06 19:24:01.867 | 2025/07/07 02:24:01 
2025-07-06 19:24:01.867 | [112.359ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-06 19:24:01.977 | 
2025-07-06 19:24:01.977 | 2025/07/07 02:24:01 
2025-07-06 19:24:01.977 | [109.956ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-06 19:24:02.131 | 
2025-07-06 19:24:02.131 | 2025/07/07 02:24:02 
2025-07-06 19:24:02.131 | [153.628ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:02.281 | 
2025-07-06 19:24:02.281 | 2025/07/07 02:24:02 
2025-07-06 19:24:02.282 | [149.968ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-06 19:24:02.382 | 
2025-07-06 19:24:02.382 | 2025/07/07 02:24:02 
2025-07-06 19:24:02.382 | [101.443ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:02.382 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:02.382 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:02.382 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:02.382 | 		AND b.relname = 'documents'
2025-07-06 19:24:02.840 | 
2025-07-06 19:24:02.840 | 2025/07/07 02:24:02 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:24:02.840 | [457.495ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'ai_entities') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:02.941 | 
2025-07-06 19:24:02.941 | 2025/07/07 02:24:02 
2025-07-06 19:24:02.941 | [100.761ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:03.053 | 
2025-07-06 19:24:03.053 | 2025/07/07 02:24:03 
2025-07-06 19:24:03.053 | [111.959ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-06 19:24:03.162 | 
2025-07-06 19:24:03.162 | 2025/07/07 02:24:03 
2025-07-06 19:24:03.162 | [109.271ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-06 19:24:03.318 | 
2025-07-06 19:24:03.318 | 2025/07/07 02:24:03 
2025-07-06 19:24:03.318 | [154.960ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:03.469 | 
2025-07-06 19:24:03.469 | 2025/07/07 02:24:03 
2025-07-06 19:24:03.469 | [151.280ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-06 19:24:03.570 | 
2025-07-06 19:24:03.570 | 2025/07/07 02:24:03 
2025-07-06 19:24:03.570 | [100.775ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:03.570 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:03.570 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:03.570 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:03.570 | 		AND b.relname = 'documents'
2025-07-06 19:24:04.061 | 
2025-07-06 19:24:04.061 | 2025/07/07 02:24:04 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:24:04.061 | [491.094ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'ai_categories') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:04.180 | 
2025-07-06 19:24:04.180 | 2025/07/07 02:24:04 
2025-07-06 19:24:04.180 | [119.211ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:04.328 | 
2025-07-06 19:24:04.328 | 2025/07/07 02:24:04 
2025-07-06 19:24:04.328 | [147.941ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'documents'
2025-07-06 19:24:04.447 | 
2025-07-06 19:24:04.447 | 2025/07/07 02:24:04 
2025-07-06 19:24:04.447 | [118.226ms] [rows:-] SELECT * FROM "documents" LIMIT 1
2025-07-06 19:24:04.615 | 
2025-07-06 19:24:04.615 | 2025/07/07 02:24:04 
2025-07-06 19:24:04.615 | [167.466ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:04.766 | 
2025-07-06 19:24:04.766 | 2025/07/07 02:24:04 
2025-07-06 19:24:04.766 | [151.305ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'documents'
2025-07-06 19:24:04.869 | 
2025-07-06 19:24:04.869 | 2025/07/07 02:24:04 
2025-07-06 19:24:04.869 | [102.446ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:04.869 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:04.869 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:04.869 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:04.869 | 		AND b.relname = 'documents'
2025-07-06 19:24:05.328 | 
2025-07-06 19:24:05.328 | 2025/07/07 02:24:05 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:24:05.328 | [459.037ms] [rows:1] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'ai_confidence_score') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:05.380 | 
2025-07-06 19:24:05.380 | 2025/07/07 02:24:05 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:05.380 | [52.639ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'a_iprocessed_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:05.433 | 
2025-07-06 19:24:05.433 | 2025/07/07 02:24:05 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:05.433 | [52.307ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'title') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:05.486 | 
2025-07-06 19:24:05.486 | 2025/07/07 02:24:05 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:05.486 | [52.648ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'description') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:05.537 | 
2025-07-06 19:24:05.537 | 2025/07/07 02:24:05 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:05.537 | [51.646ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'document_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:05.588 | 
2025-07-06 19:24:05.588 | 2025/07/07 02:24:05 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:05.588 | [51.085ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'status') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:05.639 | 
2025-07-06 19:24:05.639 | 2025/07/07 02:24:05 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:05.639 | [50.475ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'version') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:05.690 | 
2025-07-06 19:24:05.690 | 2025/07/07 02:24:05 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:05.690 | [50.731ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'language') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:05.741 | 
2025-07-06 19:24:05.741 | 2025/07/07 02:24:05 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:05.741 | [50.792ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'document_number') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:05.791 | 
2025-07-06 19:24:05.791 | 2025/07/07 02:24:05 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:05.791 | [49.957ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'reference_number') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:05.842 | 
2025-07-06 19:24:05.842 | 2025/07/07 02:24:05 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:05.842 | [50.714ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'external_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:05.892 | 
2025-07-06 19:24:05.892 | 2025/07/07 02:24:05 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:05.892 | [50.193ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'amount') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:05.943 | 
2025-07-06 19:24:05.943 | 2025/07/07 02:24:05 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:05.943 | [50.940ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'currency') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:05.993 | 
2025-07-06 19:24:05.994 | 2025/07/07 02:24:05 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:05.994 | [50.437ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'tax_amount') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.044 | 
2025-07-06 19:24:06.044 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.044 | [50.342ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'vendor_name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.095 | 
2025-07-06 19:24:06.095 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.095 | [50.565ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'customer_name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.145 | 
2025-07-06 19:24:06.145 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.145 | [50.110ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'document_date') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.196 | 
2025-07-06 19:24:06.196 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.196 | [50.752ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'due_date') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.246 | 
2025-07-06 19:24:06.246 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.246 | [49.838ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'expiry_date') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.296 | 
2025-07-06 19:24:06.297 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.297 | [50.659ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'compliance_status') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.348 | 
2025-07-06 19:24:06.348 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.348 | [51.002ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'retention_date') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.399 | 
2025-07-06 19:24:06.399 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.399 | [51.084ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'legal_hold') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.450 | 
2025-07-06 19:24:06.450 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.450 | [50.843ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'extracted_data') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.500 | 
2025-07-06 19:24:06.500 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.500 | [50.316ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'custom_fields') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.551 | 
2025-07-06 19:24:06.551 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.551 | [50.793ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'created_by') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.603 | 
2025-07-06 19:24:06.603 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.603 | [51.452ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'updated_by') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.653 | 
2025-07-06 19:24:06.653 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.653 | [50.490ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.703 | 
2025-07-06 19:24:06.703 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.703 | [49.653ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.754 | 
2025-07-06 19:24:06.754 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.754 | [50.679ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'author') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.804 | 
2025-07-06 19:24:06.804 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.804 | [50.558ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'subject') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.854 | 
2025-07-06 19:24:06.855 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.855 | [50.144ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'keywords') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.905 | 
2025-07-06 19:24:06.905 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.905 | [50.446ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'document_created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:06.956 | 
2025-07-06 19:24:06.956 | 2025/07/07 02:24:06 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:06.956 | [50.314ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND column_name = 'document_modified_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'documents' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:07.066 | 
2025-07-06 19:24:07.066 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.066 | [110.008ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND constraint_name = 'fk_users_created_documents'
2025-07-06 19:24:07.117 | 
2025-07-06 19:24:07.117 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.117 | [50.914ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND constraint_name = 'fk_tenants_documents'
2025-07-06 19:24:07.169 | 
2025-07-06 19:24:07.169 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.169 | [51.790ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND constraint_name = 'fk_folders_documents'
2025-07-06 19:24:07.221 | 
2025-07-06 19:24:07.221 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.221 | [51.739ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'documents' AND constraint_name = 'fk_users_updated_documents'
2025-07-06 19:24:07.323 | 
2025-07-06 19:24:07.323 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.323 | [101.955ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:07.375 | 
2025-07-06 19:24:07.375 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.375 | [52.284ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_folder_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:07.426 | 
2025-07-06 19:24:07.426 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.426 | [50.338ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_content_hash' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:07.477 | 
2025-07-06 19:24:07.477 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.477 | [51.325ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_document_type' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:07.528 | 
2025-07-06 19:24:07.528 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.528 | [51.013ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_document_number' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:07.579 | 
2025-07-06 19:24:07.579 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.579 | [50.668ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_reference_number' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:07.630 | 
2025-07-06 19:24:07.630 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.630 | [50.593ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_external_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:07.680 | 
2025-07-06 19:24:07.680 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.680 | [49.923ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_vendor_name' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:07.732 | 
2025-07-06 19:24:07.733 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.733 | [52.590ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_customer_name' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:07.783 | 
2025-07-06 19:24:07.783 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.783 | [50.721ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_document_date' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:07.834 | 
2025-07-06 19:24:07.834 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.834 | [50.306ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_due_date' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:07.884 | 
2025-07-06 19:24:07.884 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.884 | [50.039ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_expiry_date' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:07.934 | 
2025-07-06 19:24:07.934 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.934 | [50.127ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_retention_date' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:07.986 | 
2025-07-06 19:24:07.986 | 2025/07/07 02:24:07 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:07.986 | [51.059ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_created_by' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:08.036 | 
2025-07-06 19:24:08.036 | 2025/07/07 02:24:08 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:08.036 | [50.109ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'documents' AND indexname = 'idx_documents_updated_by' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:08.137 | 
2025-07-06 19:24:08.137 | 2025/07/07 02:24:08 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:08.137 | [101.069ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_categories' AND table_type = 'BASE TABLE'
2025-07-06 19:24:08.238 | 
2025-07-06 19:24:08.238 | 2025/07/07 02:24:08 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:08.238 | [101.335ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:08.344 | 
2025-07-06 19:24:08.344 | 2025/07/07 02:24:08 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:08.344 | [105.641ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_categories'
2025-07-06 19:24:08.448 | 
2025-07-06 19:24:08.448 | 2025/07/07 02:24:08 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:08.448 | [103.305ms] [rows:-] SELECT * FROM "document_categories" LIMIT 1
2025-07-06 19:24:08.555 | 
2025-07-06 19:24:08.555 | 2025/07/07 02:24:08 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:08.555 | [107.260ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_categories' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:08.670 | 
2025-07-06 19:24:08.670 | 2025/07/07 02:24:08 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:08.670 | [115.047ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_categories'
2025-07-06 19:24:08.771 | 
2025-07-06 19:24:08.771 | 2025/07/07 02:24:08 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:08.771 | [100.405ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:08.771 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:08.771 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:08.771 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:08.771 | 		AND b.relname = 'document_categories'
2025-07-06 19:24:08.820 | 
2025-07-06 19:24:08.820 | 2025/07/07 02:24:08 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:08.820 | [49.569ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_categories' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:08.871 | 
2025-07-06 19:24:08.871 | 2025/07/07 02:24:08 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:08.871 | [50.768ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_categories' AND column_name = 'category_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_categories' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:08.923 | 
2025-07-06 19:24:08.923 | 2025/07/07 02:24:08 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:08.923 | [51.552ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_categories' AND constraint_name = 'fk_document_categories_document'
2025-07-06 19:24:08.974 | 
2025-07-06 19:24:08.974 | 2025/07/07 02:24:08 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:08.974 | [51.128ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_categories' AND constraint_name = 'fk_document_categories_category'
2025-07-06 19:24:09.025 | 
2025-07-06 19:24:09.025 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.025 | [51.065ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND table_type = 'BASE TABLE'
2025-07-06 19:24:09.075 | 
2025-07-06 19:24:09.075 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.075 | [50.095ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:09.131 | 
2025-07-06 19:24:09.131 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.131 | [55.628ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'tags'
2025-07-06 19:24:09.236 | 
2025-07-06 19:24:09.236 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.236 | [104.387ms] [rows:-] SELECT * FROM "tags" LIMIT 1
2025-07-06 19:24:09.293 | 
2025-07-06 19:24:09.293 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.293 | [56.919ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'tags' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:09.350 | 
2025-07-06 19:24:09.350 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.350 | [56.966ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'tags'
2025-07-06 19:24:09.401 | 
2025-07-06 19:24:09.401 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.401 | [51.174ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:09.401 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:09.401 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:09.401 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:09.401 | 		AND b.relname = 'tags'
2025-07-06 19:24:09.452 | 
2025-07-06 19:24:09.452 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.452 | [51.136ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:09.503 | 
2025-07-06 19:24:09.503 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.503 | [50.678ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:09.554 | 
2025-07-06 19:24:09.554 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.554 | [50.498ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND column_name = 'name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:09.604 | 
2025-07-06 19:24:09.604 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.604 | [50.729ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND column_name = 'color') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:09.656 | 
2025-07-06 19:24:09.656 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.656 | [51.027ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND column_name = 'is_ai_generated') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:09.706 | 
2025-07-06 19:24:09.706 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.706 | [50.135ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND column_name = 'usage_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:09.756 | 
2025-07-06 19:24:09.756 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.756 | [50.364ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:09.807 | 
2025-07-06 19:24:09.807 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.807 | [50.705ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'tags' AND constraint_name = 'fk_tenants_tags'
2025-07-06 19:24:09.858 | 
2025-07-06 19:24:09.858 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.858 | [50.562ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'tags' AND indexname = 'idx_tags_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:09.908 | 
2025-07-06 19:24:09.908 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.908 | [50.164ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'tags' AND indexname = 'idx_tenant_tag_name' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:09.959 | 
2025-07-06 19:24:09.959 | 2025/07/07 02:24:09 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:09.959 | [50.601ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_tags' AND table_type = 'BASE TABLE'
2025-07-06 19:24:10.009 | 
2025-07-06 19:24:10.009 | 2025/07/07 02:24:10 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:10.009 | [49.932ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:10.066 | 
2025-07-06 19:24:10.066 | 2025/07/07 02:24:10 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:10.066 | [56.841ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_tags'
2025-07-06 19:24:10.166 | 
2025-07-06 19:24:10.167 | 2025/07/07 02:24:10 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:10.167 | [100.601ms] [rows:-] SELECT * FROM "document_tags" LIMIT 1
2025-07-06 19:24:10.223 | 
2025-07-06 19:24:10.223 | 2025/07/07 02:24:10 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:10.223 | [56.313ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_tags' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:10.279 | 
2025-07-06 19:24:10.279 | 2025/07/07 02:24:10 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:10.279 | [55.848ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_tags'
2025-07-06 19:24:10.330 | 
2025-07-06 19:24:10.330 | 2025/07/07 02:24:10 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:10.330 | [50.712ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:10.330 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:10.330 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:10.330 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:10.330 | 		AND b.relname = 'document_tags'
2025-07-06 19:24:10.384 | 
2025-07-06 19:24:10.384 | 2025/07/07 02:24:10 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:10.384 | [54.547ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_tags' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:10.435 | 
2025-07-06 19:24:10.435 | 2025/07/07 02:24:10 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:10.435 | [50.308ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_tags' AND column_name = 'tag_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_tags' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:10.488 | 
2025-07-06 19:24:10.488 | 2025/07/07 02:24:10 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:10.488 | [53.032ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_tags' AND constraint_name = 'fk_document_tags_tag'
2025-07-06 19:24:10.538 | 
2025-07-06 19:24:10.538 | 2025/07/07 02:24:10 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:10.538 | [50.470ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_tags' AND constraint_name = 'fk_document_tags_document'
2025-07-06 19:24:10.589 | 
2025-07-06 19:24:10.590 | 2025/07/07 02:24:10 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:10.590 | [51.054ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND table_type = 'BASE TABLE'
2025-07-06 19:24:10.639 | 
2025-07-06 19:24:10.640 | 2025/07/07 02:24:10 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:10.640 | [50.117ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:10.697 | 
2025-07-06 19:24:10.697 | 2025/07/07 02:24:10 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:10.697 | [57.047ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions'
2025-07-06 19:24:10.800 | 
2025-07-06 19:24:10.800 | 2025/07/07 02:24:10 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:10.800 | [103.102ms] [rows:-] SELECT * FROM "document_versions" LIMIT 1
2025-07-06 19:24:10.858 | 
2025-07-06 19:24:10.858 | 2025/07/07 02:24:10 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:10.858 | [57.638ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_versions' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:10.915 | 
2025-07-06 19:24:10.915 | 2025/07/07 02:24:10 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:10.915 | [56.910ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_versions'
2025-07-06 19:24:10.967 | 
2025-07-06 19:24:10.967 | 2025/07/07 02:24:10 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:10.967 | [52.137ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:10.967 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:10.967 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:10.967 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:10.967 | 		AND b.relname = 'document_versions'
2025-07-06 19:24:11.018 | 
2025-07-06 19:24:11.018 | 2025/07/07 02:24:11 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:11.018 | [50.732ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:11.076 | 
2025-07-06 19:24:11.076 | 2025/07/07 02:24:11 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:11.076 | [58.316ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:11.144 | 
2025-07-06 19:24:11.144 | 2025/07/07 02:24:11 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:11.144 | [67.596ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'version_number') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:11.205 | 
2025-07-06 19:24:11.205 | 2025/07/07 02:24:11 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:11.205 | [60.876ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'storage_path') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:11.263 | 
2025-07-06 19:24:11.263 | 2025/07/07 02:24:11 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:11.263 | [58.029ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'file_size') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:11.323 | 
2025-07-06 19:24:11.324 | 2025/07/07 02:24:11 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:11.324 | [60.285ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'content_hash') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:11.378 | 
2025-07-06 19:24:11.378 | 2025/07/07 02:24:11 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:11.378 | [54.188ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'changes') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:11.436 | 
2025-07-06 19:24:11.436 | 2025/07/07 02:24:11 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:11.436 | [57.745ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'created_by') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:11.499 | 
2025-07-06 19:24:11.499 | 2025/07/07 02:24:11 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:11.499 | [63.126ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_versions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:11.555 | 
2025-07-06 19:24:11.555 | 2025/07/07 02:24:11 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:11.555 | [55.854ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND constraint_name = 'fk_document_versions_creator'
2025-07-06 19:24:11.625 | 
2025-07-06 19:24:11.625 | 2025/07/07 02:24:11 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:11.625 | [69.971ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_versions' AND constraint_name = 'fk_documents_versions'
2025-07-06 19:24:11.690 | 
2025-07-06 19:24:11.690 | 2025/07/07 02:24:11 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:11.690 | [65.507ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_versions' AND indexname = 'idx_document_versions_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:11.764 | 
2025-07-06 19:24:11.764 | 2025/07/07 02:24:11 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:11.764 | [73.542ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND table_type = 'BASE TABLE'
2025-07-06 19:24:11.836 | 
2025-07-06 19:24:11.836 | 2025/07/07 02:24:11 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:11.836 | [71.808ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:11.912 | 
2025-07-06 19:24:11.912 | 2025/07/07 02:24:11 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:11.912 | [75.841ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates'
2025-07-06 19:24:12.042 | 
2025-07-06 19:24:12.042 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.042 | [129.779ms] [rows:-] SELECT * FROM "document_templates" LIMIT 1
2025-07-06 19:24:12.108 | 
2025-07-06 19:24:12.108 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.108 | [66.183ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_templates' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:12.166 | 
2025-07-06 19:24:12.166 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.166 | [57.519ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_templates'
2025-07-06 19:24:12.217 | 
2025-07-06 19:24:12.217 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.217 | [50.832ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:12.217 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:12.217 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:12.217 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:12.217 | 		AND b.relname = 'document_templates'
2025-07-06 19:24:12.267 | 
2025-07-06 19:24:12.267 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.267 | [50.476ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:12.318 | 
2025-07-06 19:24:12.318 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.318 | [50.549ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:12.368 | 
2025-07-06 19:24:12.368 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.368 | [50.124ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:12.418 | 
2025-07-06 19:24:12.418 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.418 | [50.229ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'description') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:12.469 | 
2025-07-06 19:24:12.469 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.469 | [50.626ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'doc_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:12.520 | 
2025-07-06 19:24:12.520 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.520 | [50.776ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'template') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:12.571 | 
2025-07-06 19:24:12.571 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.571 | [50.595ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'is_active') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:12.621 | 
2025-07-06 19:24:12.621 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.621 | [50.569ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'created_by') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:12.672 | 
2025-07-06 19:24:12.672 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.672 | [50.098ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:12.722 | 
2025-07-06 19:24:12.722 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.722 | [50.157ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_templates' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:12.773 | 
2025-07-06 19:24:12.773 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.773 | [50.924ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND constraint_name = 'fk_document_templates_creator'
2025-07-06 19:24:12.824 | 
2025-07-06 19:24:12.824 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.824 | [51.137ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_templates' AND constraint_name = 'fk_tenants_templates'
2025-07-06 19:24:12.875 | 
2025-07-06 19:24:12.875 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.875 | [50.774ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_templates' AND indexname = 'idx_document_templates_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:12.926 | 
2025-07-06 19:24:12.926 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.926 | [50.878ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND table_type = 'BASE TABLE'
2025-07-06 19:24:12.976 | 
2025-07-06 19:24:12.976 | 2025/07/07 02:24:12 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:12.976 | [50.469ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:13.032 | 
2025-07-06 19:24:13.033 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.033 | [55.862ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments'
2025-07-06 19:24:13.137 | 
2025-07-06 19:24:13.137 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.137 | [104.667ms] [rows:-] SELECT * FROM "document_comments" LIMIT 1
2025-07-06 19:24:13.197 | 
2025-07-06 19:24:13.197 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.197 | [59.199ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_comments' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:13.256 | 
2025-07-06 19:24:13.256 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.256 | [59.219ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_comments'
2025-07-06 19:24:13.308 | 
2025-07-06 19:24:13.308 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.308 | [52.111ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:13.308 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:13.308 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:13.308 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:13.308 | 		AND b.relname = 'document_comments'
2025-07-06 19:24:13.359 | 
2025-07-06 19:24:13.359 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.359 | [50.455ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_comments' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:13.410 | 
2025-07-06 19:24:13.410 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.410 | [50.995ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_comments' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:13.460 | 
2025-07-06 19:24:13.460 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.460 | [50.328ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND column_name = 'user_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_comments' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:13.511 | 
2025-07-06 19:24:13.511 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.511 | [50.372ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND column_name = 'content') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_comments' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:13.562 | 
2025-07-06 19:24:13.562 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.562 | [50.996ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND column_name = 'is_resolved') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_comments' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:13.613 | 
2025-07-06 19:24:13.613 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.613 | [51.058ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_comments' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:13.664 | 
2025-07-06 19:24:13.664 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.664 | [51.069ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_comments' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:13.716 | 
2025-07-06 19:24:13.716 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.716 | [51.262ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND constraint_name = 'fk_document_comments_user'
2025-07-06 19:24:13.773 | 
2025-07-06 19:24:13.773 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.773 | [57.239ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_comments' AND constraint_name = 'fk_documents_comments'
2025-07-06 19:24:13.823 | 
2025-07-06 19:24:13.824 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.824 | [50.412ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_comments' AND indexname = 'idx_document_comments_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:13.874 | 
2025-07-06 19:24:13.874 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.874 | [50.276ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_comments' AND indexname = 'idx_document_comments_user_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:13.924 | 
2025-07-06 19:24:13.924 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.924 | [50.460ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND table_type = 'BASE TABLE'
2025-07-06 19:24:13.975 | 
2025-07-06 19:24:13.975 | 2025/07/07 02:24:13 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:13.975 | [50.554ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:14.027 | 
2025-07-06 19:24:14.027 | 2025/07/07 02:24:14 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:14.027 | [52.325ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings'
2025-07-06 19:24:14.134 | 
2025-07-06 19:24:14.134 | 2025/07/07 02:24:14 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:14.134 | [105.964ms] [rows:-] SELECT * FROM "document_embeddings" LIMIT 1
2025-07-06 19:24:14.186 | 
2025-07-06 19:24:14.186 | 2025/07/07 02:24:14 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:14.186 | [52.105ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_embeddings' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:14.238 | 
2025-07-06 19:24:14.238 | 2025/07/07 02:24:14 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:14.238 | [52.555ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_embeddings'
2025-07-06 19:24:14.293 | 
2025-07-06 19:24:14.293 | 2025/07/07 02:24:14 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:14.293 | [53.935ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:14.293 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:14.293 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:14.293 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:14.293 | 		AND b.relname = 'document_embeddings'
2025-07-06 19:24:14.343 | 
2025-07-06 19:24:14.343 | 2025/07/07 02:24:14 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:14.343 | [50.801ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_embeddings' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:14.395 | 
2025-07-06 19:24:14.395 | 2025/07/07 02:24:14 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:14.395 | [51.375ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_embeddings' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:14.445 | 
2025-07-06 19:24:14.445 | 2025/07/07 02:24:14 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:14.445 | [49.899ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND column_name = 'embedding') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_embeddings' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:14.497 | 
2025-07-06 19:24:14.497 | 2025/07/07 02:24:14 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:14.497 | [52.168ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND column_name = 'chunk_index') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_embeddings' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:14.548 | 
2025-07-06 19:24:14.548 | 2025/07/07 02:24:14 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:14.548 | [50.464ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND column_name = 'chunk_content') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_embeddings' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:14.600 | 
2025-07-06 19:24:14.600 | 2025/07/07 02:24:14 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:14.600 | [52.053ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND column_name = 'token_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_embeddings' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:14.651 | 
2025-07-06 19:24:14.651 | 2025/07/07 02:24:14 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:14.651 | [50.813ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_embeddings' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:14.702 | 
2025-07-06 19:24:14.702 | 2025/07/07 02:24:14 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:14.702 | [51.455ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_embeddings' AND constraint_name = 'fk_documents_embeddings'
2025-07-06 19:24:14.753 | 
2025-07-06 19:24:14.753 | 2025/07/07 02:24:14 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:14.753 | [50.801ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_embeddings' AND indexname = 'idx_document_embeddings_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:14.804 | 
2025-07-06 19:24:14.804 | 2025/07/07 02:24:14 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:14.804 | [50.975ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND table_type = 'BASE TABLE'
2025-07-06 19:24:14.855 | 
2025-07-06 19:24:14.855 | 2025/07/07 02:24:14 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:14.855 | [50.417ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:14.909 | 
2025-07-06 19:24:14.909 | 2025/07/07 02:24:14 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:14.909 | [54.417ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions'
2025-07-06 19:24:15.024 | 
2025-07-06 19:24:15.024 | 2025/07/07 02:24:15 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:15.024 | [114.404ms] [rows:-] SELECT * FROM "document_chat_sessions" LIMIT 1
2025-07-06 19:24:15.080 | 
2025-07-06 19:24:15.080 | 2025/07/07 02:24:15 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:15.080 | [56.291ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_chat_sessions' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:15.132 | 
2025-07-06 19:24:15.132 | 2025/07/07 02:24:15 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:15.132 | [51.786ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_chat_sessions'
2025-07-06 19:24:15.182 | 
2025-07-06 19:24:15.183 | 2025/07/07 02:24:15 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:15.183 | [50.284ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:15.183 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:15.183 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:15.183 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:15.183 | 		AND b.relname = 'document_chat_sessions'
2025-07-06 19:24:15.233 | 
2025-07-06 19:24:15.233 | 2025/07/07 02:24:15 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:15.233 | [50.429ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:15.283 | 
2025-07-06 19:24:15.283 | 2025/07/07 02:24:15 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:15.283 | [49.981ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:15.333 | 
2025-07-06 19:24:15.334 | 2025/07/07 02:24:15 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:15.334 | [50.278ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'user_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:15.384 | 
2025-07-06 19:24:15.384 | 2025/07/07 02:24:15 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:15.384 | [50.566ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'session_name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:15.435 | 
2025-07-06 19:24:15.435 | 2025/07/07 02:24:15 
2025-07-06 19:24:15.435 | [50.359ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:15.487 | 
2025-07-06 19:24:15.487 | 2025/07/07 02:24:15 
2025-07-06 19:24:15.487 | [52.744ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions'
2025-07-06 19:24:15.539 | 
2025-07-06 19:24:15.539 | 2025/07/07 02:24:15 
2025-07-06 19:24:15.539 | [51.008ms] [rows:-] SELECT * FROM "document_chat_sessions" LIMIT 1
2025-07-06 19:24:15.594 | 
2025-07-06 19:24:15.594 | 2025/07/07 02:24:15 
2025-07-06 19:24:15.594 | [55.690ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_chat_sessions' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:15.651 | 
2025-07-06 19:24:15.651 | 2025/07/07 02:24:15 
2025-07-06 19:24:15.651 | [56.538ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_chat_sessions'
2025-07-06 19:24:15.701 | 
2025-07-06 19:24:15.701 | 2025/07/07 02:24:15 
2025-07-06 19:24:15.701 | [49.823ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:15.701 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:15.701 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:15.701 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:15.701 | 		AND b.relname = 'document_chat_sessions'
2025-07-06 19:24:15.804 | 
2025-07-06 19:24:15.804 | 2025/07/07 02:24:15 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:15.804 | [103.344ms] [rows:0] ALTER TABLE "document_chat_sessions" ALTER COLUMN "messages" SET DEFAULT '[]'
2025-07-06 19:24:16.810 | 
2025-07-06 19:24:16.810 | 2025/07/07 02:24:16 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:24:16.810 | [1005.591ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'messages') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:16.911 | 
2025-07-06 19:24:16.911 | 2025/07/07 02:24:16 
2025-07-06 19:24:16.911 | [100.402ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:17.020 | 
2025-07-06 19:24:17.020 | 2025/07/07 02:24:17 
2025-07-06 19:24:17.020 | [109.040ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions'
2025-07-06 19:24:17.121 | 
2025-07-06 19:24:17.121 | 2025/07/07 02:24:17 
2025-07-06 19:24:17.121 | [101.012ms] [rows:-] SELECT * FROM "document_chat_sessions" LIMIT 1
2025-07-06 19:24:17.233 | 
2025-07-06 19:24:17.233 | 2025/07/07 02:24:17 
2025-07-06 19:24:17.233 | [111.431ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_chat_sessions' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:17.340 | 
2025-07-06 19:24:17.340 | 2025/07/07 02:24:17 
2025-07-06 19:24:17.340 | [107.130ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_chat_sessions'
2025-07-06 19:24:17.440 | 
2025-07-06 19:24:17.440 | 2025/07/07 02:24:17 
2025-07-06 19:24:17.441 | [100.272ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:17.441 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:17.441 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:17.441 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:17.441 | 		AND b.relname = 'document_chat_sessions'
2025-07-06 19:24:17.545 | 
2025-07-06 19:24:17.545 | 2025/07/07 02:24:17 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:17.545 | [104.655ms] [rows:0] ALTER TABLE "document_chat_sessions" ALTER COLUMN "context" SET DEFAULT '{}'
2025-07-06 19:24:18.048 | 
2025-07-06 19:24:18.048 | 2025/07/07 02:24:18 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:24:18.048 | [503.032ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'context') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:18.101 | 
2025-07-06 19:24:18.101 | 2025/07/07 02:24:18 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:18.101 | [53.147ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'is_active') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:18.154 | 
2025-07-06 19:24:18.154 | 2025/07/07 02:24:18 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:18.154 | [52.791ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'total_messages') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:18.207 | 
2025-07-06 19:24:18.207 | 2025/07/07 02:24:18 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:18.207 | [52.234ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'last_message_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:18.259 | 
2025-07-06 19:24:18.259 | 2025/07/07 02:24:18 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:18.259 | [51.908ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:18.311 | 
2025-07-06 19:24:18.311 | 2025/07/07 02:24:18 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:18.311 | [52.591ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_chat_sessions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:18.413 | 
2025-07-06 19:24:18.413 | 2025/07/07 02:24:18 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:18.413 | [101.953ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND constraint_name = 'fk_document_chat_sessions_user'
2025-07-06 19:24:18.465 | 
2025-07-06 19:24:18.465 | 2025/07/07 02:24:18 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:18.465 | [51.611ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_chat_sessions' AND constraint_name = 'fk_documents_chat_sessions'
2025-07-06 19:24:18.568 | 
2025-07-06 19:24:18.568 | 2025/07/07 02:24:18 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:18.568 | [102.978ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_chat_sessions' AND indexname = 'idx_document_chat_sessions_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:18.619 | 
2025-07-06 19:24:18.619 | 2025/07/07 02:24:18 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:18.619 | [51.188ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_chat_sessions' AND indexname = 'idx_document_chat_sessions_user_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:18.720 | 
2025-07-06 19:24:18.720 | 2025/07/07 02:24:18 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:18.720 | [100.816ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND table_type = 'BASE TABLE'
2025-07-06 19:24:18.821 | 
2025-07-06 19:24:18.821 | 2025/07/07 02:24:18 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:18.821 | [100.370ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:18.933 | 
2025-07-06 19:24:18.933 | 2025/07/07 02:24:18 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:18.933 | [112.550ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships'
2025-07-06 19:24:19.040 | 
2025-07-06 19:24:19.040 | 2025/07/07 02:24:19 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:19.040 | [106.802ms] [rows:-] SELECT * FROM "document_relationships" LIMIT 1
2025-07-06 19:24:19.150 | 
2025-07-06 19:24:19.150 | 2025/07/07 02:24:19 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:19.150 | [108.858ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_relationships' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:19.257 | 
2025-07-06 19:24:19.257 | 2025/07/07 02:24:19 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:19.257 | [107.629ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_relationships'
2025-07-06 19:24:19.359 | 
2025-07-06 19:24:19.359 | 2025/07/07 02:24:19 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:19.359 | [101.471ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:19.359 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:19.359 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:19.359 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:19.359 | 		AND b.relname = 'document_relationships'
2025-07-06 19:24:19.408 | 
2025-07-06 19:24:19.409 | 2025/07/07 02:24:19 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:19.409 | [49.687ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_relationships' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:19.459 | 
2025-07-06 19:24:19.459 | 2025/07/07 02:24:19 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:19.459 | [50.436ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND column_name = 'source_document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_relationships' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:19.509 | 
2025-07-06 19:24:19.509 | 2025/07/07 02:24:19 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:19.509 | [50.335ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND column_name = 'target_document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_relationships' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:19.560 | 
2025-07-06 19:24:19.560 | 2025/07/07 02:24:19 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:19.560 | [50.764ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND column_name = 'relationship_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_relationships' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:19.611 | 
2025-07-06 19:24:19.611 | 2025/07/07 02:24:19 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:19.611 | [50.537ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND column_name = 'confidence_score') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_relationships' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:19.662 | 
2025-07-06 19:24:19.662 | 2025/07/07 02:24:19 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:19.662 | [50.653ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND column_name = 'description') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_relationships' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:19.713 | 
2025-07-06 19:24:19.713 | 2025/07/07 02:24:19 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:19.713 | [50.963ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND column_name = 'detected_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_relationships' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:19.763 | 
2025-07-06 19:24:19.763 | 2025/07/07 02:24:19 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:19.763 | [50.569ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_relationships' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:19.814 | 
2025-07-06 19:24:19.814 | 2025/07/07 02:24:19 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:19.814 | [50.830ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND constraint_name = 'fk_document_relationships_source_document'
2025-07-06 19:24:19.866 | 
2025-07-06 19:24:19.866 | 2025/07/07 02:24:19 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:19.866 | [51.215ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_relationships' AND constraint_name = 'fk_document_relationships_target_document'
2025-07-06 19:24:19.916 | 
2025-07-06 19:24:19.916 | 2025/07/07 02:24:19 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:19.916 | [50.541ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_relationships' AND indexname = 'idx_document_relationships_source_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:19.967 | 
2025-07-06 19:24:19.967 | 2025/07/07 02:24:19 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:19.967 | [51.014ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_relationships' AND indexname = 'idx_document_relationships_target_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:20.018 | 
2025-07-06 19:24:20.019 | 2025/07/07 02:24:20 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:20.019 | [51.064ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND table_type = 'BASE TABLE'
2025-07-06 19:24:20.069 | 
2025-07-06 19:24:20.069 | 2025/07/07 02:24:20 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:20.069 | [50.407ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:20.125 | 
2025-07-06 19:24:20.125 | 2025/07/07 02:24:20 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:20.125 | [56.202ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses'
2025-07-06 19:24:20.231 | 
2025-07-06 19:24:20.231 | 2025/07/07 02:24:20 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:20.231 | [105.256ms] [rows:-] SELECT * FROM "multi_document_analyses" LIMIT 1
2025-07-06 19:24:20.287 | 
2025-07-06 19:24:20.287 | 2025/07/07 02:24:20 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:20.287 | [56.684ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'multi_document_analyses' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:20.344 | 
2025-07-06 19:24:20.344 | 2025/07/07 02:24:20 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:20.344 | [56.758ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'multi_document_analyses'
2025-07-06 19:24:20.395 | 
2025-07-06 19:24:20.396 | 2025/07/07 02:24:20 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:20.396 | [51.143ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:20.396 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:20.396 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:20.396 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:20.396 | 		AND b.relname = 'multi_document_analyses'
2025-07-06 19:24:20.447 | 
2025-07-06 19:24:20.447 | 2025/07/07 02:24:20 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:20.447 | [51.377ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:20.498 | 
2025-07-06 19:24:20.498 | 2025/07/07 02:24:20 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:20.498 | [50.435ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'user_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:20.548 | 
2025-07-06 19:24:20.548 | 2025/07/07 02:24:20 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:20.548 | [50.060ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:20.598 | 
2025-07-06 19:24:20.598 | 2025/07/07 02:24:20 
2025-07-06 19:24:20.598 | [50.354ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:20.655 | 
2025-07-06 19:24:20.655 | 2025/07/07 02:24:20 
2025-07-06 19:24:20.655 | [56.072ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses'
2025-07-06 19:24:20.705 | 
2025-07-06 19:24:20.705 | 2025/07/07 02:24:20 
2025-07-06 19:24:20.705 | [50.313ms] [rows:-] SELECT * FROM "multi_document_analyses" LIMIT 1
2025-07-06 19:24:20.761 | 
2025-07-06 19:24:20.761 | 2025/07/07 02:24:20 
2025-07-06 19:24:20.761 | [56.333ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'multi_document_analyses' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:20.818 | 
2025-07-06 19:24:20.818 | 2025/07/07 02:24:20 
2025-07-06 19:24:20.818 | [56.546ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'multi_document_analyses'
2025-07-06 19:24:20.869 | 
2025-07-06 19:24:20.869 | 2025/07/07 02:24:20 
2025-07-06 19:24:20.869 | [50.804ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:20.869 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:20.869 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:20.869 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:20.869 | 		AND b.relname = 'multi_document_analyses'
2025-07-06 19:24:21.524 | 
2025-07-06 19:24:21.524 | 2025/07/07 02:24:21 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:24:21.524 | [654.995ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'document_ids') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:21.577 | 
2025-07-06 19:24:21.577 | 2025/07/07 02:24:21 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:21.577 | [52.366ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'analysis_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:21.629 | 
2025-07-06 19:24:21.629 | 2025/07/07 02:24:21 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:21.629 | [52.016ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'query') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:21.680 | 
2025-07-06 19:24:21.680 | 2025/07/07 02:24:21 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:21.680 | [51.530ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'result') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:21.732 | 
2025-07-06 19:24:21.732 | 2025/07/07 02:24:21 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:21.732 | [51.709ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'confidence_score') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:21.785 | 
2025-07-06 19:24:21.785 | 2025/07/07 02:24:21 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:21.785 | [52.556ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'processing_time_ms') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:21.836 | 
2025-07-06 19:24:21.836 | 2025/07/07 02:24:21 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:21.836 | [50.942ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'multi_document_analyses' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:21.938 | 
2025-07-06 19:24:21.938 | 2025/07/07 02:24:21 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:21.938 | [101.879ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND constraint_name = 'fk_multi_document_analyses_user'
2025-07-06 19:24:21.989 | 
2025-07-06 19:24:21.989 | 2025/07/07 02:24:21 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:21.989 | [50.794ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'multi_document_analyses' AND constraint_name = 'fk_multi_document_analyses_tenant'
2025-07-06 19:24:22.090 | 
2025-07-06 19:24:22.090 | 2025/07/07 02:24:22 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:22.090 | [101.470ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'multi_document_analyses' AND indexname = 'idx_multi_document_analyses_user_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:22.142 | 
2025-07-06 19:24:22.142 | 2025/07/07 02:24:22 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:22.142 | [51.119ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'multi_document_analyses' AND indexname = 'idx_multi_document_analyses_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:22.244 | 
2025-07-06 19:24:22.244 | 2025/07/07 02:24:22 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:22.244 | [101.953ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND table_type = 'BASE TABLE'
2025-07-06 19:24:22.344 | 
2025-07-06 19:24:22.344 | 2025/07/07 02:24:22 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:22.344 | [100.363ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:22.451 | 
2025-07-06 19:24:22.451 | 2025/07/07 02:24:22 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:22.451 | [106.443ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics'
2025-07-06 19:24:22.559 | 
2025-07-06 19:24:22.559 | 2025/07/07 02:24:22 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:22.559 | [108.578ms] [rows:-] SELECT * FROM "document_analytics" LIMIT 1
2025-07-06 19:24:22.700 | 
2025-07-06 19:24:22.700 | 2025/07/07 02:24:22 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:22.700 | [140.466ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_analytics' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:22.833 | 
2025-07-06 19:24:22.833 | 2025/07/07 02:24:22 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:22.833 | [132.699ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'document_analytics'
2025-07-06 19:24:22.957 | 
2025-07-06 19:24:22.957 | 2025/07/07 02:24:22 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:22.957 | [124.521ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:22.957 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:22.957 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:22.957 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:22.957 | 		AND b.relname = 'document_analytics'
2025-07-06 19:24:23.030 | 
2025-07-06 19:24:23.030 | 2025/07/07 02:24:23 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:23.030 | [72.606ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:23.114 | 
2025-07-06 19:24:23.114 | 2025/07/07 02:24:23 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:23.114 | [83.634ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:23.181 | 
2025-07-06 19:24:23.181 | 2025/07/07 02:24:23 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:23.181 | [66.703ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:23.242 | 
2025-07-06 19:24:23.242 | 2025/07/07 02:24:23 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:23.242 | [61.196ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'view_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:23.307 | 
2025-07-06 19:24:23.307 | 2025/07/07 02:24:23 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:23.307 | [65.308ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'download_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:23.368 | 
2025-07-06 19:24:23.368 | 2025/07/07 02:24:23 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:23.368 | [60.630ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'share_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:23.423 | 
2025-07-06 19:24:23.423 | 2025/07/07 02:24:23 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:23.423 | [55.178ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'last_accessed_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:23.477 | 
2025-07-06 19:24:23.477 | 2025/07/07 02:24:23 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:23.477 | [53.507ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'processing_time') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:23.531 | 
2025-07-06 19:24:23.531 | 2025/07/07 02:24:23 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:23.531 | [53.751ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'storage_cost') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:23.581 | 
2025-07-06 19:24:23.581 | 2025/07/07 02:24:23 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:23.581 | [50.259ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:23.632 | 
2025-07-06 19:24:23.632 | 2025/07/07 02:24:23 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:23.632 | [50.637ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'document_analytics' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:23.684 | 
2025-07-06 19:24:23.684 | 2025/07/07 02:24:23 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:23.684 | [51.884ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND constraint_name = 'fk_document_analytics_document'
2025-07-06 19:24:23.736 | 
2025-07-06 19:24:23.736 | 2025/07/07 02:24:23 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:23.736 | [52.090ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'document_analytics' AND constraint_name = 'fk_document_analytics_tenant'
2025-07-06 19:24:23.788 | 
2025-07-06 19:24:23.788 | 2025/07/07 02:24:23 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:23.788 | [51.237ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_analytics' AND indexname = 'idx_document_analytics_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:23.839 | 
2025-07-06 19:24:23.839 | 2025/07/07 02:24:23 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:23.839 | [51.562ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'document_analytics' AND indexname = 'idx_document_analytics_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:23.894 | 
2025-07-06 19:24:23.894 | 2025/07/07 02:24:23 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:23.894 | [54.391ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND table_type = 'BASE TABLE'
2025-07-06 19:24:23.944 | 
2025-07-06 19:24:23.944 | 2025/07/07 02:24:23 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:23.944 | [50.178ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:24.000 | 
2025-07-06 19:24:24.000 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.000 | [56.408ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'workflows'
2025-07-06 19:24:24.104 | 
2025-07-06 19:24:24.104 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.104 | [103.254ms] [rows:-] SELECT * FROM "workflows" LIMIT 1
2025-07-06 19:24:24.160 | 
2025-07-06 19:24:24.160 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.160 | [56.395ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'workflows' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:24.223 | 
2025-07-06 19:24:24.223 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.223 | [62.344ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'workflows'
2025-07-06 19:24:24.274 | 
2025-07-06 19:24:24.274 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.274 | [50.649ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:24.274 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:24.274 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:24.274 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:24.274 | 		AND b.relname = 'workflows'
2025-07-06 19:24:24.324 | 
2025-07-06 19:24:24.324 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.324 | [50.274ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:24.374 | 
2025-07-06 19:24:24.374 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.374 | [50.253ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:24.425 | 
2025-07-06 19:24:24.425 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.425 | [50.281ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:24.475 | 
2025-07-06 19:24:24.475 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.475 | [50.208ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'description') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:24.526 | 
2025-07-06 19:24:24.526 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.526 | [50.727ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'doc_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:24.582 | 
2025-07-06 19:24:24.582 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.582 | [55.929ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'rules') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:24.637 | 
2025-07-06 19:24:24.637 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.637 | [55.084ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'is_active') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:24.688 | 
2025-07-06 19:24:24.688 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.688 | [50.894ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'created_by') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:24.738 | 
2025-07-06 19:24:24.738 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.738 | [50.193ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:24.788 | 
2025-07-06 19:24:24.788 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.788 | [50.064ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflows' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:24.839 | 
2025-07-06 19:24:24.839 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.839 | [50.961ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND constraint_name = 'fk_workflows_creator'
2025-07-06 19:24:24.891 | 
2025-07-06 19:24:24.891 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.891 | [51.832ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflows' AND constraint_name = 'fk_tenants_workflows'
2025-07-06 19:24:24.942 | 
2025-07-06 19:24:24.942 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.942 | [50.529ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'workflows' AND indexname = 'idx_workflows_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:24.993 | 
2025-07-06 19:24:24.993 | 2025/07/07 02:24:24 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:24.993 | [50.748ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND table_type = 'BASE TABLE'
2025-07-06 19:24:25.043 | 
2025-07-06 19:24:25.043 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.043 | [50.234ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:25.099 | 
2025-07-06 19:24:25.099 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.099 | [56.053ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks'
2025-07-06 19:24:25.211 | 
2025-07-06 19:24:25.211 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.211 | [111.601ms] [rows:-] SELECT * FROM "workflow_tasks" LIMIT 1
2025-07-06 19:24:25.267 | 
2025-07-06 19:24:25.267 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.267 | [56.164ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'workflow_tasks' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:25.324 | 
2025-07-06 19:24:25.324 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.324 | [56.667ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'workflow_tasks'
2025-07-06 19:24:25.374 | 
2025-07-06 19:24:25.374 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.374 | [50.058ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:25.374 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:25.374 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:25.374 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:25.374 | 		AND b.relname = 'workflow_tasks'
2025-07-06 19:24:25.425 | 
2025-07-06 19:24:25.425 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.425 | [50.538ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:25.475 | 
2025-07-06 19:24:25.475 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.475 | [50.523ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'workflow_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:25.526 | 
2025-07-06 19:24:25.526 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.526 | [50.219ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:25.577 | 
2025-07-06 19:24:25.577 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.577 | [51.029ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'assigned_to') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:25.627 | 
2025-07-06 19:24:25.627 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.627 | [50.281ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'task_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:25.678 | 
2025-07-06 19:24:25.678 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.678 | [50.192ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'status') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:25.728 | 
2025-07-06 19:24:25.728 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.728 | [50.469ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'priority') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:25.779 | 
2025-07-06 19:24:25.779 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.779 | [50.836ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'due_date') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:25.829 | 
2025-07-06 19:24:25.829 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.829 | [49.917ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'comments') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:25.880 | 
2025-07-06 19:24:25.880 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.880 | [50.635ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'completed_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:25.931 | 
2025-07-06 19:24:25.931 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.931 | [50.965ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:25.982 | 
2025-07-06 19:24:25.982 | 2025/07/07 02:24:25 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:25.982 | [50.927ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'workflow_tasks' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:26.032 | 
2025-07-06 19:24:26.032 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.032 | [49.915ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND constraint_name = 'fk_workflows_tasks'
2025-07-06 19:24:26.082 | 
2025-07-06 19:24:26.083 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.083 | [50.454ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND constraint_name = 'fk_documents_workflow_tasks'
2025-07-06 19:24:26.133 | 
2025-07-06 19:24:26.133 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.133 | [50.140ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'workflow_tasks' AND constraint_name = 'fk_users_workflow_tasks'
2025-07-06 19:24:26.183 | 
2025-07-06 19:24:26.183 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.183 | [50.597ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'workflow_tasks' AND indexname = 'idx_workflow_tasks_workflow_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:26.234 | 
2025-07-06 19:24:26.234 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.234 | [50.150ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'workflow_tasks' AND indexname = 'idx_workflow_tasks_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:26.284 | 
2025-07-06 19:24:26.284 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.284 | [50.208ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'workflow_tasks' AND indexname = 'idx_workflow_tasks_assigned_to' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:26.334 | 
2025-07-06 19:24:26.334 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.334 | [50.285ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND table_type = 'BASE TABLE'
2025-07-06 19:24:26.384 | 
2025-07-06 19:24:26.384 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.384 | [50.113ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:26.441 | 
2025-07-06 19:24:26.441 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.441 | [56.227ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'notifications'
2025-07-06 19:24:26.544 | 
2025-07-06 19:24:26.544 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.544 | [103.442ms] [rows:-] SELECT * FROM "notifications" LIMIT 1
2025-07-06 19:24:26.600 | 
2025-07-06 19:24:26.600 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.600 | [55.986ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'notifications' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:26.657 | 
2025-07-06 19:24:26.657 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.657 | [56.402ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'notifications'
2025-07-06 19:24:26.707 | 
2025-07-06 19:24:26.707 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.707 | [50.348ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:26.707 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:26.707 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:26.707 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:26.707 | 		AND b.relname = 'notifications'
2025-07-06 19:24:26.758 | 
2025-07-06 19:24:26.758 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.758 | [50.466ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:26.808 | 
2025-07-06 19:24:26.808 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.808 | [50.267ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:26.859 | 
2025-07-06 19:24:26.859 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.859 | [50.735ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'user_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:26.910 | 
2025-07-06 19:24:26.910 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.910 | [50.819ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:26.961 | 
2025-07-06 19:24:26.961 | 2025/07/07 02:24:26 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:26.961 | [50.682ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'title') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:27.012 | 
2025-07-06 19:24:27.012 | 2025/07/07 02:24:27 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:27.012 | [51.198ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'message') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:27.062 | 
2025-07-06 19:24:27.062 | 2025/07/07 02:24:27 
2025-07-06 19:24:27.062 | [50.100ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:27.119 | 
2025-07-06 19:24:27.119 | 2025/07/07 02:24:27 
2025-07-06 19:24:27.119 | [56.510ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'notifications'
2025-07-06 19:24:27.169 | 
2025-07-06 19:24:27.170 | 2025/07/07 02:24:27 
2025-07-06 19:24:27.170 | [50.370ms] [rows:-] SELECT * FROM "notifications" LIMIT 1
2025-07-06 19:24:27.226 | 
2025-07-06 19:24:27.226 | 2025/07/07 02:24:27 
2025-07-06 19:24:27.226 | [56.434ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'notifications' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:27.287 | 
2025-07-06 19:24:27.287 | 2025/07/07 02:24:27 
2025-07-06 19:24:27.287 | [60.544ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'notifications'
2025-07-06 19:24:27.338 | 
2025-07-06 19:24:27.338 | 2025/07/07 02:24:27 
2025-07-06 19:24:27.338 | [50.941ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:27.338 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:27.338 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:27.338 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:27.338 | 		AND b.relname = 'notifications'
2025-07-06 19:24:27.450 | 
2025-07-06 19:24:27.450 | 2025/07/07 02:24:27 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:27.450 | [112.666ms] [rows:0] ALTER TABLE "notifications" ALTER COLUMN "channel" TYPE varchar(20) USING "channel"::varchar(20)
2025-07-06 19:24:28.317 | 
2025-07-06 19:24:28.317 | 2025/07/07 02:24:28 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:24:28.317 | [866.463ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'channel') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:28.369 | 
2025-07-06 19:24:28.369 | 2025/07/07 02:24:28 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:28.369 | [51.863ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'is_read') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:28.421 | 
2025-07-06 19:24:28.421 | 2025/07/07 02:24:28 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:28.421 | [51.923ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'data') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:28.473 | 
2025-07-06 19:24:28.473 | 2025/07/07 02:24:28 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:28.473 | [51.962ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'notifications' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:28.575 | 
2025-07-06 19:24:28.575 | 2025/07/07 02:24:28 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:28.575 | [101.537ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND constraint_name = 'fk_notifications_tenant'
2025-07-06 19:24:28.627 | 
2025-07-06 19:24:28.627 | 2025/07/07 02:24:28 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:28.627 | [51.931ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'notifications' AND constraint_name = 'fk_notifications_user'
2025-07-06 19:24:28.728 | 
2025-07-06 19:24:28.728 | 2025/07/07 02:24:28 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:28.728 | [101.100ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'notifications' AND indexname = 'idx_notifications_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:28.784 | 
2025-07-06 19:24:28.784 | 2025/07/07 02:24:28 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:28.784 | [56.292ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'notifications' AND indexname = 'idx_notifications_user_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:28.886 | 
2025-07-06 19:24:28.886 | 2025/07/07 02:24:28 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:28.886 | [101.350ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND table_type = 'BASE TABLE'
2025-07-06 19:24:28.987 | 
2025-07-06 19:24:28.987 | 2025/07/07 02:24:28 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:28.987 | [100.865ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:29.096 | 
2025-07-06 19:24:29.096 | 2025/07/07 02:24:29 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:29.096 | [108.989ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs'
2025-07-06 19:24:29.221 | 
2025-07-06 19:24:29.221 | 2025/07/07 02:24:29 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:29.221 | [125.367ms] [rows:-] SELECT * FROM "a_iprocessing_jobs" LIMIT 1
2025-07-06 19:24:29.329 | 
2025-07-06 19:24:29.329 | 2025/07/07 02:24:29 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:29.329 | [107.757ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'a_iprocessing_jobs' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:29.438 | 
2025-07-06 19:24:29.438 | 2025/07/07 02:24:29 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:29.438 | [108.564ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'a_iprocessing_jobs'
2025-07-06 19:24:29.539 | 
2025-07-06 19:24:29.539 | 2025/07/07 02:24:29 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:29.539 | [100.821ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:29.539 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:29.539 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:29.539 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:29.539 | 		AND b.relname = 'a_iprocessing_jobs'
2025-07-06 19:24:29.590 | 
2025-07-06 19:24:29.590 | 2025/07/07 02:24:29 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:29.590 | [51.597ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:29.643 | 
2025-07-06 19:24:29.643 | 2025/07/07 02:24:29 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:29.643 | [52.284ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:29.694 | 
2025-07-06 19:24:29.694 | 2025/07/07 02:24:29 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:29.694 | [50.523ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:29.745 | 
2025-07-06 19:24:29.745 | 2025/07/07 02:24:29 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:29.745 | [51.249ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'job_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:29.796 | 
2025-07-06 19:24:29.796 | 2025/07/07 02:24:29 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:29.796 | [50.701ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'status') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:29.847 | 
2025-07-06 19:24:29.847 | 2025/07/07 02:24:29 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:29.847 | [51.667ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'priority') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:29.898 | 
2025-07-06 19:24:29.898 | 2025/07/07 02:24:29 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:29.898 | [50.694ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'attempts') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:29.949 | 
2025-07-06 19:24:29.949 | 2025/07/07 02:24:29 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:29.949 | [50.432ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'max_attempts') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:30.000 | 
2025-07-06 19:24:30.000 | 2025/07/07 02:24:29 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.000 | [50.678ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'error_message') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:30.051 | 
2025-07-06 19:24:30.051 | 2025/07/07 02:24:30 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.051 | [51.358ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'result') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:30.103 | 
2025-07-06 19:24:30.103 | 2025/07/07 02:24:30 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.103 | [51.553ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'processing_time_ms') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:30.153 | 
2025-07-06 19:24:30.153 | 2025/07/07 02:24:30 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.153 | [50.653ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:30.204 | 
2025-07-06 19:24:30.204 | 2025/07/07 02:24:30 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.204 | [50.524ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'started_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:30.256 | 
2025-07-06 19:24:30.256 | 2025/07/07 02:24:30 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.256 | [51.503ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND column_name = 'completed_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'a_iprocessing_jobs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:30.307 | 
2025-07-06 19:24:30.307 | 2025/07/07 02:24:30 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.307 | [51.545ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND constraint_name = 'fk_tenants_ai_jobs'
2025-07-06 19:24:30.360 | 
2025-07-06 19:24:30.361 | 2025/07/07 02:24:30 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.361 | [53.038ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'a_iprocessing_jobs' AND constraint_name = 'fk_documents_ai_jobs'
2025-07-06 19:24:30.411 | 
2025-07-06 19:24:30.411 | 2025/07/07 02:24:30 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.411 | [50.958ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'a_iprocessing_jobs' AND indexname = 'idx_a_iprocessing_jobs_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:30.463 | 
2025-07-06 19:24:30.463 | 2025/07/07 02:24:30 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.463 | [51.805ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'a_iprocessing_jobs' AND indexname = 'idx_a_iprocessing_jobs_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:30.515 | 
2025-07-06 19:24:30.515 | 2025/07/07 02:24:30 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.515 | [51.543ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'a_iprocessing_jobs' AND indexname = 'idx_a_iprocessing_jobs_status' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:30.567 | 
2025-07-06 19:24:30.567 | 2025/07/07 02:24:30 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.567 | [51.531ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND table_type = 'BASE TABLE'
2025-07-06 19:24:30.617 | 
2025-07-06 19:24:30.617 | 2025/07/07 02:24:30 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.617 | [50.521ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:30.674 | 
2025-07-06 19:24:30.674 | 2025/07/07 02:24:30 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.674 | [56.523ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs'
2025-07-06 19:24:30.787 | 
2025-07-06 19:24:30.787 | 2025/07/07 02:24:30 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.787 | [112.793ms] [rows:-] SELECT * FROM "audit_logs" LIMIT 1
2025-07-06 19:24:30.844 | 
2025-07-06 19:24:30.844 | 2025/07/07 02:24:30 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.845 | [57.582ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'audit_logs' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:30.901 | 
2025-07-06 19:24:30.901 | 2025/07/07 02:24:30 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.901 | [56.149ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'audit_logs'
2025-07-06 19:24:30.952 | 
2025-07-06 19:24:30.952 | 2025/07/07 02:24:30 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:30.952 | [50.938ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:30.952 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:30.952 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:30.952 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:30.952 | 		AND b.relname = 'audit_logs'
2025-07-06 19:24:31.003 | 
2025-07-06 19:24:31.003 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.003 | [50.778ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:31.054 | 
2025-07-06 19:24:31.054 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.054 | [51.048ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:31.104 | 
2025-07-06 19:24:31.104 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.104 | [50.478ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'user_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:31.155 | 
2025-07-06 19:24:31.155 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.155 | [50.291ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'resource_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:31.206 | 
2025-07-06 19:24:31.206 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.206 | [50.933ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'action') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:31.256 | 
2025-07-06 19:24:31.256 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.256 | [50.137ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'resource_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:31.301 | 
2025-07-06 19:24:31.301 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.301 | [50.107ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'ip_address') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:31.352 | 
2025-07-06 19:24:31.352 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.352 | [50.396ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'user_agent') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:31.403 | 
2025-07-06 19:24:31.403 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.403 | [50.783ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'details') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:31.454 | 
2025-07-06 19:24:31.454 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.454 | [51.054ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'audit_logs' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:31.505 | 
2025-07-06 19:24:31.505 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.505 | [51.208ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND constraint_name = 'fk_audit_logs_user'
2025-07-06 19:24:31.557 | 
2025-07-06 19:24:31.557 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.557 | [51.233ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'audit_logs' AND constraint_name = 'fk_audit_logs_tenant'
2025-07-06 19:24:31.608 | 
2025-07-06 19:24:31.608 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.608 | [51.179ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'audit_logs' AND indexname = 'idx_audit_logs_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:31.658 | 
2025-07-06 19:24:31.658 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.658 | [50.508ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'audit_logs' AND indexname = 'idx_audit_logs_user_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:31.709 | 
2025-07-06 19:24:31.709 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.709 | [50.924ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'audit_logs' AND indexname = 'idx_audit_logs_resource_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:31.763 | 
2025-07-06 19:24:31.763 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.763 | [53.344ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND table_type = 'BASE TABLE'
2025-07-06 19:24:31.813 | 
2025-07-06 19:24:31.813 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.813 | [50.262ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:31.870 | 
2025-07-06 19:24:31.870 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.870 | [56.545ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'shares'
2025-07-06 19:24:31.976 | 
2025-07-06 19:24:31.976 | 2025/07/07 02:24:31 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:31.976 | [106.477ms] [rows:-] SELECT * FROM "shares" LIMIT 1
2025-07-06 19:24:32.033 | 
2025-07-06 19:24:32.034 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.034 | [56.850ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'shares' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:32.091 | 
2025-07-06 19:24:32.091 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.091 | [57.757ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'shares'
2025-07-06 19:24:32.142 | 
2025-07-06 19:24:32.142 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.142 | [50.377ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:32.142 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:32.142 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:32.142 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:32.142 | 		AND b.relname = 'shares'
2025-07-06 19:24:32.192 | 
2025-07-06 19:24:32.192 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.192 | [50.609ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:32.243 | 
2025-07-06 19:24:32.243 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.243 | [50.319ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:32.293 | 
2025-07-06 19:24:32.294 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.294 | [50.531ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'document_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:32.344 | 
2025-07-06 19:24:32.344 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.344 | [50.902ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'created_by') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:32.397 | 
2025-07-06 19:24:32.397 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.397 | [52.598ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'token') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:32.448 | 
2025-07-06 19:24:32.448 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.448 | [51.084ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'password') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:32.500 | 
2025-07-06 19:24:32.500 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.500 | [51.787ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'expires_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:32.558 | 
2025-07-06 19:24:32.558 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.558 | [57.002ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'max_downloads') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:32.612 | 
2025-07-06 19:24:32.612 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.612 | [54.338ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'download_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:32.663 | 
2025-07-06 19:24:32.664 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.664 | [51.358ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'is_active') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:32.714 | 
2025-07-06 19:24:32.714 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.714 | [50.615ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:32.764 | 
2025-07-06 19:24:32.764 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.764 | [49.907ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'shares' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:32.815 | 
2025-07-06 19:24:32.815 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.815 | [50.487ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND constraint_name = 'fk_shares_creator'
2025-07-06 19:24:32.865 | 
2025-07-06 19:24:32.865 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.865 | [50.165ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND constraint_name = 'fk_shares_tenant'
2025-07-06 19:24:32.916 | 
2025-07-06 19:24:32.916 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.916 | [50.559ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'shares' AND constraint_name = 'fk_shares_document'
2025-07-06 19:24:32.967 | 
2025-07-06 19:24:32.967 | 2025/07/07 02:24:32 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:32.967 | [51.219ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'shares' AND indexname = 'idx_shares_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:33.018 | 
2025-07-06 19:24:33.018 | 2025/07/07 02:24:33 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:33.018 | [50.532ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'shares' AND indexname = 'idx_shares_document_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:33.069 | 
2025-07-06 19:24:33.069 | 2025/07/07 02:24:33 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:33.069 | [51.054ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'shares' AND indexname = 'idx_shares_created_by' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:33.119 | 
2025-07-06 19:24:33.119 | 2025/07/07 02:24:33 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:33.119 | [50.279ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND table_type = 'BASE TABLE'
2025-07-06 19:24:33.170 | 
2025-07-06 19:24:33.170 | 2025/07/07 02:24:33 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:33.170 | [50.353ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:33.228 | 
2025-07-06 19:24:33.228 | 2025/07/07 02:24:33 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:33.228 | [58.366ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions'
2025-07-06 19:24:33.342 | 
2025-07-06 19:24:33.342 | 2025/07/07 02:24:33 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:33.342 | [113.227ms] [rows:-] SELECT * FROM "subscriptions" LIMIT 1
2025-07-06 19:24:33.405 | 
2025-07-06 19:24:33.405 | 2025/07/07 02:24:33 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:33.405 | [62.987ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'subscriptions' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:33.467 | 
2025-07-06 19:24:33.467 | 2025/07/07 02:24:33 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:33.467 | [62.456ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'subscriptions'
2025-07-06 19:24:33.524 | 
2025-07-06 19:24:33.524 | 2025/07/07 02:24:33 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:33.524 | [56.708ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:33.524 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:33.524 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:33.524 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:33.524 | 		AND b.relname = 'subscriptions'
2025-07-06 19:24:33.582 | 
2025-07-06 19:24:33.582 | 2025/07/07 02:24:33 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:33.582 | [57.563ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:33.632 | 
2025-07-06 19:24:33.632 | 2025/07/07 02:24:33 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:33.632 | [50.143ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:33.683 | 
2025-07-06 19:24:33.683 | 2025/07/07 02:24:33 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:33.683 | [50.310ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'stripe_customer_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:33.736 | 
2025-07-06 19:24:33.736 | 2025/07/07 02:24:33 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:33.736 | [53.204ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'stripe_subscription_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:33.787 | 
2025-07-06 19:24:33.787 | 2025/07/07 02:24:33 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:33.787 | [51.146ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'stripe_price_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:33.838 | 
2025-07-06 19:24:33.838 | 2025/07/07 02:24:33 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:33.838 | [51.040ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'stripe_product_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:33.889 | 
2025-07-06 19:24:33.889 | 2025/07/07 02:24:33 
2025-07-06 19:24:33.889 | [50.420ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:33.948 | 
2025-07-06 19:24:33.948 | 2025/07/07 02:24:33 
2025-07-06 19:24:33.948 | [59.191ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions'
2025-07-06 19:24:34.003 | 
2025-07-06 19:24:34.003 | 2025/07/07 02:24:34 
2025-07-06 19:24:34.003 | [54.524ms] [rows:-] SELECT * FROM "subscriptions" LIMIT 1
2025-07-06 19:24:34.067 | 
2025-07-06 19:24:34.067 | 2025/07/07 02:24:34 
2025-07-06 19:24:34.067 | [64.220ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'subscriptions' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:34.133 | 
2025-07-06 19:24:34.133 | 2025/07/07 02:24:34 
2025-07-06 19:24:34.133 | [66.095ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'subscriptions'
2025-07-06 19:24:34.186 | 
2025-07-06 19:24:34.186 | 2025/07/07 02:24:34 
2025-07-06 19:24:34.186 | [52.932ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:34.186 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:34.186 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:34.186 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:34.186 | 		AND b.relname = 'subscriptions'
2025-07-06 19:24:34.344 | 
2025-07-06 19:24:34.344 | 2025/07/07 02:24:34 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:34.344 | [157.399ms] [rows:0] ALTER TABLE "subscriptions" ALTER COLUMN "status" TYPE varchar(30) USING "status"::varchar(30)
2025-07-06 19:24:35.164 | 
2025-07-06 19:24:35.164 | 2025/07/07 02:24:35 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:24:35.164 | [819.853ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'status') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:35.265 | 
2025-07-06 19:24:35.265 | 2025/07/07 02:24:35 
2025-07-06 19:24:35.265 | [101.016ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:35.376 | 
2025-07-06 19:24:35.376 | 2025/07/07 02:24:35 
2025-07-06 19:24:35.376 | [110.976ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions'
2025-07-06 19:24:35.482 | 
2025-07-06 19:24:35.482 | 2025/07/07 02:24:35 
2025-07-06 19:24:35.482 | [105.189ms] [rows:-] SELECT * FROM "subscriptions" LIMIT 1
2025-07-06 19:24:35.611 | 
2025-07-06 19:24:35.611 | 2025/07/07 02:24:35 
2025-07-06 19:24:35.611 | [128.905ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'subscriptions' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:35.733 | 
2025-07-06 19:24:35.733 | 2025/07/07 02:24:35 
2025-07-06 19:24:35.733 | [122.748ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'subscriptions'
2025-07-06 19:24:35.854 | 
2025-07-06 19:24:35.854 | 2025/07/07 02:24:35 
2025-07-06 19:24:35.854 | [120.775ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:35.854 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:35.854 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:35.854 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:35.854 | 		AND b.relname = 'subscriptions'
2025-07-06 19:24:35.992 | 
2025-07-06 19:24:35.992 | 2025/07/07 02:24:35 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:35.992 | [137.660ms] [rows:0] ALTER TABLE "subscriptions" ALTER COLUMN "tier" TYPE varchar(20) USING "tier"::varchar(20)
2025-07-06 19:24:36.647 | 
2025-07-06 19:24:36.647 | 2025/07/07 02:24:36 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:24:36.647 | [654.660ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'tier') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:36.716 | 
2025-07-06 19:24:36.716 | 2025/07/07 02:24:36 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:36.716 | [69.028ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'plan_name') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:36.790 | 
2025-07-06 19:24:36.790 | 2025/07/07 02:24:36 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:36.790 | [73.811ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'amount') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:36.861 | 
2025-07-06 19:24:36.861 | 2025/07/07 02:24:36 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:36.861 | [70.592ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'currency') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:36.931 | 
2025-07-06 19:24:36.931 | 2025/07/07 02:24:36 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:36.931 | [70.124ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'interval') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:37.013 | 
2025-07-06 19:24:37.013 | 2025/07/07 02:24:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:37.013 | [81.610ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'interval_count') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:37.079 | 
2025-07-06 19:24:37.079 | 2025/07/07 02:24:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:37.079 | [66.022ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'current_period_start') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:37.137 | 
2025-07-06 19:24:37.137 | 2025/07/07 02:24:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:37.137 | [57.851ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'current_period_end') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:37.199 | 
2025-07-06 19:24:37.199 | 2025/07/07 02:24:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:37.199 | [62.354ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'trial_start') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:37.255 | 
2025-07-06 19:24:37.255 | 2025/07/07 02:24:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:37.255 | [55.718ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'trial_end') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:37.306 | 
2025-07-06 19:24:37.306 | 2025/07/07 02:24:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:37.306 | [50.864ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'canceled_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:37.356 | 
2025-07-06 19:24:37.356 | 2025/07/07 02:24:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:37.356 | [50.357ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'cancel_at_period_end') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:37.406 | 
2025-07-06 19:24:37.406 | 2025/07/07 02:24:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:37.406 | [49.893ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'documents_included') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:37.457 | 
2025-07-06 19:24:37.457 | 2025/07/07 02:24:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:37.457 | [50.532ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'documents_used') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:37.508 | 
2025-07-06 19:24:37.508 | 2025/07/07 02:24:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:37.508 | [51.172ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'storage_included') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:37.562 | 
2025-07-06 19:24:37.562 | 2025/07/07 02:24:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:37.562 | [53.356ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'storage_used') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:37.612 | 
2025-07-06 19:24:37.612 | 2025/07/07 02:24:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:37.612 | [50.052ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'ai_credits_included') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:37.662 | 
2025-07-06 19:24:37.662 | 2025/07/07 02:24:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:37.662 | [50.034ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'ai_credits_used') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:37.712 | 
2025-07-06 19:24:37.713 | 2025/07/07 02:24:37 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:37.713 | [50.388ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'users_included') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:37.821 | 
2025-07-06 19:24:37.821 | 2025/07/07 02:24:37 
2025-07-06 19:24:37.821 | [108.657ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:37.935 | 
2025-07-06 19:24:37.935 | 2025/07/07 02:24:37 
2025-07-06 19:24:37.935 | [113.500ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions'
2025-07-06 19:24:38.044 | 
2025-07-06 19:24:38.044 | 2025/07/07 02:24:38 
2025-07-06 19:24:38.044 | [109.423ms] [rows:-] SELECT * FROM "subscriptions" LIMIT 1
2025-07-06 19:24:38.159 | 
2025-07-06 19:24:38.159 | 2025/07/07 02:24:38 
2025-07-06 19:24:38.159 | [113.936ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'subscriptions' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:38.279 | 
2025-07-06 19:24:38.279 | 2025/07/07 02:24:38 
2025-07-06 19:24:38.279 | [120.283ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'subscriptions'
2025-07-06 19:24:38.394 | 
2025-07-06 19:24:38.394 | 2025/07/07 02:24:38 
2025-07-06 19:24:38.394 | [115.021ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:38.394 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:38.394 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:38.394 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:38.394 | 		AND b.relname = 'subscriptions'
2025-07-06 19:24:38.499 | 
2025-07-06 19:24:38.499 | 2025/07/07 02:24:38 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:38.499 | [104.461ms] [rows:0] ALTER TABLE "subscriptions" ALTER COLUMN "features" SET DEFAULT '{}'
2025-07-06 19:24:39.296 | 
2025-07-06 19:24:39.296 | 2025/07/07 02:24:39 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:24:39.296 | [797.211ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'features') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:39.386 | 
2025-07-06 19:24:39.386 | 2025/07/07 02:24:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:39.386 | [89.721ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:39.540 | 
2025-07-06 19:24:39.540 | 2025/07/07 02:24:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:39.540 | [153.568ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'subscriptions' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:39.689 | 
2025-07-06 19:24:39.689 | 2025/07/07 02:24:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:39.689 | [149.354ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'subscriptions' AND constraint_name = 'fk_subscriptions_tenant'
2025-07-06 19:24:39.857 | 
2025-07-06 19:24:39.857 | 2025/07/07 02:24:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:39.857 | [168.178ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'subscriptions' AND indexname = 'idx_subscriptions_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:39.913 | 
2025-07-06 19:24:39.913 | 2025/07/07 02:24:39 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:39.913 | [55.710ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'subscriptions' AND indexname = 'idx_subscriptions_status' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:40.052 | 
2025-07-06 19:24:40.052 | 2025/07/07 02:24:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:40.052 | [138.595ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'subscriptions' AND indexname = 'idx_subscriptions_current_period_end' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:40.194 | 
2025-07-06 19:24:40.194 | 2025/07/07 02:24:40 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:40.194 | [142.554ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND table_type = 'BASE TABLE'
2025-07-06 19:24:40.482 | 
2025-07-06 19:24:40.482 | 2025/07/07 02:24:40 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:24:40.482 | [287.421ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:40.687 | 
2025-07-06 19:24:40.687 | 2025/07/07 02:24:40 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:24:40.687 | [205.253ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'invoices'
2025-07-06 19:24:40.891 | 
2025-07-06 19:24:40.891 | 2025/07/07 02:24:40 /app/internal/infrastructure/database/database.go:88 SLOW SQL >= 200ms
2025-07-06 19:24:40.891 | [203.743ms] [rows:-] SELECT * FROM "invoices" LIMIT 1
2025-07-06 19:24:41.045 | 
2025-07-06 19:24:41.045 | 2025/07/07 02:24:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:41.045 | [153.741ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'invoices' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:41.154 | 
2025-07-06 19:24:41.154 | 2025/07/07 02:24:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:41.154 | [108.393ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'invoices'
2025-07-06 19:24:41.255 | 
2025-07-06 19:24:41.255 | 2025/07/07 02:24:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:41.255 | [101.267ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:41.255 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:41.255 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:41.255 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:41.255 | 		AND b.relname = 'invoices'
2025-07-06 19:24:41.307 | 
2025-07-06 19:24:41.308 | 2025/07/07 02:24:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:41.308 | [52.478ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:41.359 | 
2025-07-06 19:24:41.359 | 2025/07/07 02:24:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:41.359 | [51.556ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:41.411 | 
2025-07-06 19:24:41.411 | 2025/07/07 02:24:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:41.412 | [52.207ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'subscription_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:41.462 | 
2025-07-06 19:24:41.462 | 2025/07/07 02:24:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:41.462 | [50.237ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'stripe_invoice_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:41.513 | 
2025-07-06 19:24:41.513 | 2025/07/07 02:24:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:41.513 | [50.786ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'stripe_payment_intent_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:41.563 | 
2025-07-06 19:24:41.563 | 2025/07/07 02:24:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:41.563 | [50.510ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'invoice_number') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:41.614 | 
2025-07-06 19:24:41.614 | 2025/07/07 02:24:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:41.614 | [50.456ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'status') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:41.665 | 
2025-07-06 19:24:41.665 | 2025/07/07 02:24:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:41.665 | [51.321ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'amount_due') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:41.716 | 
2025-07-06 19:24:41.716 | 2025/07/07 02:24:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:41.716 | [50.253ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'amount_paid') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:41.771 | 
2025-07-06 19:24:41.771 | 2025/07/07 02:24:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:41.771 | [55.767ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'subtotal') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:41.832 | 
2025-07-06 19:24:41.832 | 2025/07/07 02:24:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:41.832 | [60.206ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'tax') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:41.892 | 
2025-07-06 19:24:41.892 | 2025/07/07 02:24:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:41.892 | [60.209ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'total') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:41.954 | 
2025-07-06 19:24:41.954 | 2025/07/07 02:24:41 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:41.954 | [61.493ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'currency') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:42.017 | 
2025-07-06 19:24:42.017 | 2025/07/07 02:24:42 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:42.017 | [62.944ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'period_start') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:42.078 | 
2025-07-06 19:24:42.078 | 2025/07/07 02:24:42 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:42.078 | [61.408ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'period_end') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:42.141 | 
2025-07-06 19:24:42.141 | 2025/07/07 02:24:42 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:42.141 | [62.800ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'due_date') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:42.204 | 
2025-07-06 19:24:42.204 | 2025/07/07 02:24:42 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:42.204 | [62.441ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'paid_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:42.265 | 
2025-07-06 19:24:42.265 | 2025/07/07 02:24:42 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:42.265 | [61.464ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'hosted_invoice_url') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:42.329 | 
2025-07-06 19:24:42.329 | 2025/07/07 02:24:42 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:42.329 | [63.138ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'invoice_pdf') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:42.390 | 
2025-07-06 19:24:42.390 | 2025/07/07 02:24:42 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:42.390 | [61.049ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:42.454 | 
2025-07-06 19:24:42.454 | 2025/07/07 02:24:42 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:42.454 | [63.829ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND column_name = 'updated_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'invoices' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:42.516 | 
2025-07-06 19:24:42.516 | 2025/07/07 02:24:42 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:42.516 | [62.465ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND constraint_name = 'fk_subscriptions_invoices'
2025-07-06 19:24:42.578 | 
2025-07-06 19:24:42.578 | 2025/07/07 02:24:42 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:42.578 | [61.478ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'invoices' AND constraint_name = 'fk_invoices_tenant'
2025-07-06 19:24:42.630 | 
2025-07-06 19:24:42.630 | 2025/07/07 02:24:42 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:42.630 | [51.801ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'invoices' AND indexname = 'idx_invoices_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:42.681 | 
2025-07-06 19:24:42.681 | 2025/07/07 02:24:42 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:42.681 | [51.097ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'invoices' AND indexname = 'idx_invoices_subscription_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:42.732 | 
2025-07-06 19:24:42.732 | 2025/07/07 02:24:42 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:42.732 | [50.786ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'invoices' AND indexname = 'idx_invoices_status' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:42.783 | 
2025-07-06 19:24:42.783 | 2025/07/07 02:24:42 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:42.783 | [50.946ms] [rows:1] SELECT count(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND table_type = 'BASE TABLE'
2025-07-06 19:24:42.834 | 
2025-07-06 19:24:42.834 | 2025/07/07 02:24:42 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:42.834 | [50.645ms] [rows:1] SELECT CURRENT_DATABASE()
2025-07-06 19:24:42.890 | 
2025-07-06 19:24:42.890 | 2025/07/07 02:24:42 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:42.890 | [56.445ms] [rows:-] SELECT c.column_name, c.is_nullable = 'YES', c.udt_name, c.character_maximum_length, c.numeric_precision, c.numeric_precision_radix, c.numeric_scale, c.datetime_precision, 8 * typlen, c.column_default, pd.description, c.identity_increment FROM information_schema.columns AS c JOIN pg_type AS pgt ON c.udt_name = pgt.typname LEFT JOIN pg_catalog.pg_description as pd ON pd.objsubid = c.ordinal_position AND pd.objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = c.table_name AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = c.table_schema)) where table_catalog = 'postgres' AND table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records'
2025-07-06 19:24:43.013 | 
2025-07-06 19:24:43.013 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.013 | [122.904ms] [rows:-] SELECT * FROM "usage_records" LIMIT 1
2025-07-06 19:24:43.070 | 
2025-07-06 19:24:43.070 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.070 | [56.557ms] [rows:-] SELECT constraint_name FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'usage_records' AND constraint_type = 'UNIQUE'
2025-07-06 19:24:43.127 | 
2025-07-06 19:24:43.127 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.127 | [56.854ms] [rows:-] SELECT c.column_name, constraint_name, constraint_type FROM information_schema.table_constraints tc JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_catalog, table_name, constraint_name) JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema AND tc.table_name = c.table_name AND ccu.column_name = c.column_name WHERE constraint_type IN ('PRIMARY KEY', 'UNIQUE') AND c.table_catalog = 'postgres' AND c.table_schema = CURRENT_SCHEMA() AND c.table_name = 'usage_records'
2025-07-06 19:24:43.178 | 
2025-07-06 19:24:43.178 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.178 | [50.654ms] [rows:-] SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type
2025-07-06 19:24:43.178 | 		FROM pg_attribute a JOIN pg_class b ON a.attrelid = b.oid AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA())
2025-07-06 19:24:43.178 | 		WHERE a.attnum > 0 -- hide internal columns
2025-07-06 19:24:43.178 | 		AND NOT a.attisdropped -- hide deleted columns
2025-07-06 19:24:43.178 | 		AND b.relname = 'usage_records'
2025-07-06 19:24:43.229 | 
2025-07-06 19:24:43.229 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.229 | [51.316ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:43.280 | 
2025-07-06 19:24:43.280 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.280 | [50.687ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'tenant_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:43.331 | 
2025-07-06 19:24:43.331 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.331 | [50.563ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'subscription_id') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:43.382 | 
2025-07-06 19:24:43.382 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.382 | [51.192ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'metric_type') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:43.433 | 
2025-07-06 19:24:43.433 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.434 | [50.877ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'quantity') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:43.484 | 
2025-07-06 19:24:43.484 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.484 | [50.876ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'unit') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:43.535 | 
2025-07-06 19:24:43.535 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.535 | [50.865ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'period_start') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:43.588 | 
2025-07-06 19:24:43.588 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.588 | [52.633ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'period_end') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:43.638 | 
2025-07-06 19:24:43.638 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.638 | [50.554ms] [rows:0] SELECT description FROM pg_catalog.pg_description WHERE objsubid = (SELECT ordinal_position FROM information_schema.columns WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND column_name = 'created_at') AND objoid = (SELECT oid FROM pg_catalog.pg_class WHERE relname = 'usage_records' AND relnamespace = (SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = CURRENT_SCHEMA()))
2025-07-06 19:24:43.690 | 
2025-07-06 19:24:43.690 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.690 | [51.568ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND constraint_name = 'fk_usage_records_tenant'
2025-07-06 19:24:43.741 | 
2025-07-06 19:24:43.741 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.741 | [51.179ms] [rows:1] SELECT count(*) FROM INFORMATION_SCHEMA.table_constraints WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'usage_records' AND constraint_name = 'fk_subscriptions_usage_records'
2025-07-06 19:24:43.792 | 
2025-07-06 19:24:43.792 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.792 | [50.459ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'usage_records' AND indexname = 'idx_usage_records_tenant_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:43.842 | 
2025-07-06 19:24:43.842 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.842 | [50.348ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'usage_records' AND indexname = 'idx_usage_records_subscription_id' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:43.893 | 
2025-07-06 19:24:43.893 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.893 | [51.018ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'usage_records' AND indexname = 'idx_usage_records_period_start' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:43.944 | 
2025-07-06 19:24:43.944 | 2025/07/07 02:24:43 /app/internal/infrastructure/database/database.go:88
2025-07-06 19:24:43.944 | [50.263ms] [rows:1] SELECT count(*) FROM pg_indexes WHERE tablename = 'usage_records' AND indexname = 'idx_usage_records_period_end' AND schemaname = CURRENT_SCHEMA()
2025-07-06 19:24:43.944 | {"time":"2025-07-07T02:24:43.943878766Z","level":"INFO","msg":"Database initialized successfully"}
2025-07-06 19:24:43.951 | {"time":"2025-07-07T02:24:43.951806976Z","level":"INFO","msg":"Service manager initialized successfully with Redis","redis_url":"redis://archivus-redis:6379","database_initialized":true}
2025-07-06 19:24:43.999 | {"time":"2025-07-07T02:24:43.999535298Z","level":"INFO","msg":"All services healthy - Database and Redis connected"}
2025-07-06 19:24:43.999 | {"time":"2025-07-07T02:24:43.99956014Z","level":"INFO","msg":"Database and repositories initialized successfully","repository_count":13}
2025-07-06 19:24:43.999 | {"time":"2025-07-07T02:24:43.999566204Z","level":"INFO","msg":"Initializing Supabase storage service","url":"https://ulnisgaeijkspqambdlh.supabase.co","bucket":"archies-bucket"}
2025-07-06 19:24:43.999 | {"time":"2025-07-07T02:24:43.999604234Z","level":"INFO","msg":"Supabase storage service initialized successfully"}
2025-07-06 19:24:43.999 | {"time":"2025-07-07T02:24:43.999606303Z","level":"INFO","msg":"Initializing Supabase auth service"}
2025-07-06 19:24:43.999 | {"time":"2025-07-07T02:24:43.999612429Z","level":"INFO","msg":"Supabase auth service initialized successfully"}
2025-07-06 19:24:43.999 | {"time":"2025-07-07T02:24:43.999615446Z","level":"INFO","msg":"Initializing business services with complete repository wiring..."}
2025-07-06 19:24:43.999 | {"time":"2025-07-07T02:24:43.999619549Z","level":"INFO","msg":"AI processing disabled, OCR and AI services will not be available"}
2025-07-06 19:24:43.999 | {"time":"2025-07-07T02:24:43.999628613Z","level":"INFO","msg":"🎉 Business services initialized successfully!","user_service":true,"tenant_service":true,"document_service":true,"workflow_service":true,"analytics_service":true,"oauth_service":true,"chat_service":false,"stripe_service":false}
2025-07-06 19:24:43.999 | [GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
2025-07-06 19:24:43.999 |  - using env:	export GIN_MODE=release
2025-07-06 19:24:43.999 |  - using code:	gin.SetMode(gin.ReleaseMode)
2025-07-06 19:24:43.999 | 
2025-07-06 19:24:44.000 | [GIN-debug] OPTIONS /*path                    --> github.com/archivus/archivus/internal/app/server.NewServer.func1 (1 handlers)
2025-07-06 19:24:44.001 | {"time":"2025-07-07T02:24:44.000959182Z","level":"INFO","msg":"Configuration validation completed","valid":true,"environment":"development","error_count":0,"warning_count":0,"missing_features":["ai_processing","ocr","webhooks"]}
2025-07-06 19:24:44.001 | [GIN-debug] GET    /health                   --> github.com/archivus/archivus/internal/app/server.(*Server).healthCheck-fm (8 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /ready                    --> github.com/archivus/archivus/internal/app/server.(*Server).readinessCheck-fm (8 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /health/comprehensive     --> github.com/archivus/archivus/internal/app/server.(*Server).comprehensiveHealthCheck-fm (8 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/tenant            --> github.com/archivus/archivus/internal/app/handlers.(*TenantHandler).CreateTenant-fm (9 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/auth/register     --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).Register-fm (9 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/auth/login        --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).Login-fm (9 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/auth/logout       --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).Logout-fm (9 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/auth/refresh      --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).RefreshToken-fm (9 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/auth/reset-password --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).ResetPassword-fm (9 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/auth/validate     --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).ValidateToken-fm (9 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/auth/webhook      --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).SupabaseWebhook-fm (9 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/auth/lookup-subdomain --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).LookupSubdomain-fm (9 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/auth/csrf-token   --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).GetCSRFToken-fm (9 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/auth/oauth/url    --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).GetOAuthURL-fm (9 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/auth/oauth/callback --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).HandleOAuthCallback-fm (9 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/auth/oauth/callback --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).HandleOAuthCallback-fm (9 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/auth/admin/create-verified-user --> github.com/archivus/archivus/internal/app/handlers.(*AuthHandler).AdminCreateVerifiedUser-fm (9 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/documents/upload  --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).UploadDocument-fm (12 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/documents/        --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).ListDocuments-fm (12 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/documents         --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).ListDocuments-fm (12 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/documents/search  --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).SearchDocuments-fm (12 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/documents/:id     --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).GetDocument-fm (12 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] PUT    /api/v1/documents/:id     --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).UpdateDocument-fm (12 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] DELETE /api/v1/documents/:id     --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).DeleteDocument-fm (12 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/documents/:id/download --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).DownloadDocument-fm (12 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/documents/:id/preview --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).PreviewDocument-fm (12 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/documents/:id/ai-results --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).GetDocumentAIResults-fm (12 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/documents/:id/jobs --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).GetDocumentJobs-fm (12 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/documents/:id/summary --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).GetDocumentSummary-fm (12 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/documents/:id/process-financial --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).ProcessFinancialDocument-fm (12 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/documents/duplicates --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).FindDuplicates-fm (12 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/documents/expiring --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).GetExpiringDocuments-fm (12 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/documents/:id/processing-status --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).GetDocumentProcessingStatus-fm (12 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/documents/batch-status --> github.com/archivus/archivus/internal/app/handlers.(*DocumentHandler).GetBatchProcessingStatus-fm (12 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/users/profile     --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).GetProfile-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] PUT    /api/v1/users/profile     --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).UpdateProfile-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/users/change-password --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).ChangePassword-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/users             --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).ListUsers-fm (11 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/users             --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).CreateUser-fm (11 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] PUT    /api/v1/users/:id         --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).UpdateUser-fm (11 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] DELETE /api/v1/users/:id         --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).DeleteUser-fm (11 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] PUT    /api/v1/users/:id/role    --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).UpdateUserRole-fm (11 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] PUT    /api/v1/users/:id/activate --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).ActivateUser-fm (11 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] PUT    /api/v1/users/:id/deactivate --> github.com/archivus/archivus/internal/app/handlers.(*UserHandler).DeactivateUser-fm (11 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/tenant/settings   --> github.com/archivus/archivus/internal/app/handlers.(*TenantHandler).GetSettings-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] PUT    /api/v1/tenant/settings   --> github.com/archivus/archivus/internal/app/handlers.(*TenantHandler).UpdateSettings-fm (11 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/tenant/usage      --> github.com/archivus/archivus/internal/app/handlers.(*TenantHandler).GetUsage-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/tenant/users      --> github.com/archivus/archivus/internal/app/handlers.(*TenantHandler).GetTenantUsers-fm (11 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/folders           --> github.com/archivus/archivus/internal/app/handlers.(*FolderHandler).CreateFolder-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/folders           --> github.com/archivus/archivus/internal/app/handlers.(*FolderHandler).ListFolders-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/folders/:id       --> github.com/archivus/archivus/internal/app/handlers.(*FolderHandler).GetFolder-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] PUT    /api/v1/folders/:id       --> github.com/archivus/archivus/internal/app/handlers.(*FolderHandler).UpdateFolder-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] DELETE /api/v1/folders/:id       --> github.com/archivus/archivus/internal/app/handlers.(*FolderHandler).DeleteFolder-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/folders/:id/tree  --> github.com/archivus/archivus/internal/app/handlers.(*FolderHandler).GetFolderTree-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/folders/:id/move  --> github.com/archivus/archivus/internal/app/handlers.(*FolderHandler).MoveFolder-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/folders/:id/documents --> github.com/archivus/archivus/internal/app/handlers.(*FolderHandler).GetFolderDocuments-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/tags              --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).CreateTag-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/tags              --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).ListTags-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/tags/:id          --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).GetTag-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] PUT    /api/v1/tags/:id          --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).UpdateTag-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] DELETE /api/v1/tags/:id          --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).DeleteTag-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/tags/popular      --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).GetPopularTags-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/tags/suggestions  --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).GetTagSuggestions-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/documents/:id/tags --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).GetDocumentTags-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/documents/:id/tags/generate --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).GenerateDocumentTags-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/documents/:id/tags --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).AddTagToDocument-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] DELETE /api/v1/documents/:id/tags/:tag_id --> github.com/archivus/archivus/internal/app/handlers.(*TagHandler).RemoveTagFromDocument-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/categories        --> github.com/archivus/archivus/internal/app/handlers.(*CategoryHandler).CreateCategory-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/categories        --> github.com/archivus/archivus/internal/app/handlers.(*CategoryHandler).ListCategories-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/categories/:id    --> github.com/archivus/archivus/internal/app/handlers.(*CategoryHandler).GetCategory-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] PUT    /api/v1/categories/:id    --> github.com/archivus/archivus/internal/app/handlers.(*CategoryHandler).UpdateCategory-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] DELETE /api/v1/categories/:id    --> github.com/archivus/archivus/internal/app/handlers.(*CategoryHandler).DeleteCategory-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/categories/system --> github.com/archivus/archivus/internal/app/handlers.(*CategoryHandler).GetSystemCategories-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/workflows         --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).CreateWorkflow-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/workflows         --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).ListWorkflows-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/workflows/:workflow_id --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).GetWorkflow-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] PUT    /api/v1/workflows/:workflow_id --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).UpdateWorkflow-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] DELETE /api/v1/workflows/:workflow_id --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).DeleteWorkflow-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/workflows/trigger/:document_id --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).TriggerWorkflow-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/workflows/document/:document_id --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).GetDocumentWorkflow-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/tasks             --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).GetUserTasks-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/tasks/pending     --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).GetPendingTasks-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/tasks/overdue     --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).GetOverdueTasks-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/tasks/:task_id/complete --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).CompleteTask-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/tasks/:task_id/delegate --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).DelegateTask-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/workflows/stats   --> github.com/archivus/archivus/internal/app/handlers.(*WorkflowHandler).GetWorkflowStats-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/analytics/dashboard --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).GetDashboard-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/analytics/overview --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).GetDashboard-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/analytics/documents --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).GetDocumentAnalytics-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/analytics/users   --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).GetUserAnalytics-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/analytics/storage --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).GetStorageReport-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/analytics/compliance --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).GetComplianceReport-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/analytics/financial --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).GetFinancialReport-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/analytics/ai-processing --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).GetAIProcessingStats-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/analytics/export/csv --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).ExportAnalyticsCSV-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/analytics/export/xlsx --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).ExportAnalyticsExcel-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/analytics/export/pdf --> github.com/archivus/archivus/internal/app/handlers.(*AnalyticsHandler).ExportAnalyticsPDF-fm (10 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/subscription/status --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).GetSubscriptionStatus-fm (11 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/subscription/plans --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).GetAvailablePlans-fm (11 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/subscription/usage --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).GetUsageStats-fm (11 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] GET    /api/v1/subscription/summary --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).GetSubscriptionSummary-fm (11 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/subscription/checkout --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).CreateCheckoutSession-fm (11 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/subscription/portal --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).CreateCustomerPortal-fm (11 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/subscription/cancel --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).CancelSubscription-fm (11 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/subscription/reactivate --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).ReactivateSubscription-fm (11 handlers)
2025-07-06 19:24:44.002 | [GIN-debug] POST   /api/v1/webhooks/stripe   --> github.com/archivus/archivus/internal/app/handlers.(*SubscriptionHandler).HandleStripeWebhook-fm (8 handlers)
2025-07-06 19:24:44.003 | [GIN-debug] GET    /static/*filepath         --> github.com/gin-gonic/gin.(*RouterGroup).createStaticHandler.func1 (8 handlers)
2025-07-06 19:24:44.003 | [GIN-debug] HEAD   /static/*filepath         --> github.com/gin-gonic/gin.(*RouterGroup).createStaticHandler.func1 (8 handlers)
2025-07-06 19:24:44.003 | [GIN-debug] GET    /health/detailed          --> github.com/archivus/archivus/internal/app/server.(*Server).RegisterMonitoringRoutes.func1 (8 handlers)
2025-07-06 19:24:44.003 | [GIN-debug] GET    /metrics                  --> github.com/archivus/archivus/internal/app/server.(*Server).RegisterMonitoringRoutes.func2 (8 handlers)
2025-07-06 19:24:44.003 | [GIN-debug] GET    /admin/rate-limits        --> github.com/archivus/archivus/internal/app/server.(*Server).RegisterMonitoringRoutes.func3 (8 handlers)
2025-07-06 19:24:44.003 | {"time":"2025-07-07T02:24:44.002930097Z","level":"INFO","msg":"Starting HTTP server in development mode"}
2025-07-06 19:24:44.003 | {"time":"2025-07-07T02:24:44.002978492Z","level":"INFO","msg":"Starting HTTP server","port":"8080"}
2025-07-06 19:24:45.711 | ::1 - [Mon, 07 Jul 2025 02:24:45 UTC] "GET /health HTTP/1.1 200 635.095µs "Wget" "
2025-07-06 19:25:15.733 | ::1 - [Mon, 07 Jul 2025 02:25:15 UTC] "GET /health HTTP/1.1 200 733.511µs "Wget" "
2025-07-06 19:25:45.783 | ::1 - [Mon, 07 Jul 2025 02:25:45 UTC] "GET /health HTTP/1.1 200 692.253µs "Wget" "
2025-07-06 19:26:15.813 | ::1 - [Mon, 07 Jul 2025 02:26:15 UTC] "GET /health HTTP/1.1 200 879.333µs "Wget" "
2025-07-06 19:26:45.857 | ::1 - [Mon, 07 Jul 2025 02:26:45 UTC] "GET /health HTTP/1.1 200 1.12905ms "Wget" "
2025-07-06 19:27:15.892 | ::1 - [Mon, 07 Jul 2025 02:27:15 UTC] "GET /health HTTP/1.1 200 5.901482ms "Wget" "
2025-07-06 19:27:45.965 | ::1 - [Mon, 07 Jul 2025 02:27:45 UTC] "GET /health HTTP/1.1 200 1.158897ms "Wget" "
2025-07-06 19:28:16.008 | ::1 - [Mon, 07 Jul 2025 02:28:16 UTC] "GET /health HTTP/1.1 200 1.070894ms "Wget" "
2025-07-06 19:28:37.684 | {"time":"2025-07-07T02:28:37.684342792Z","level":"INFO","msg":"OPTIONS preflight request","origin":"http://localhost:3000","allowed":true,"allowedOrigins":["http://localhost:3000","http://localhost:3001"],"environment":"development"}
2025-07-06 19:28:38.569 | 172.20.0.1 - [Mon, 07 Jul 2025 02:28:38 UTC] "POST /api/v1/auth/login HTTP/1.1 200 880.199029ms "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36" "
2025-07-06 19:28:38.609 | {"time":"2025-07-07T02:28:38.609756279Z","level":"INFO","msg":"OPTIONS preflight request","origin":"http://localhost:3000","allowed":true,"allowedOrigins":["http://localhost:3000","http://localhost:3001"],"environment":"development"}
2025-07-06 19:28:38.611 | {"time":"2025-07-07T02:28:38.611644576Z","level":"INFO","msg":"OPTIONS preflight request","origin":"http://localhost:3000","allowed":true,"allowedOrigins":["http://localhost:3000","http://localhost:3001"],"environment":"development"}
2025-07-06 19:28:38.611 | {"time":"2025-07-07T02:28:38.611710967Z","level":"ERROR","msg":"Failed to get subscription summary from cache","error":"key not found","tenant_id":"ef1a53af-2c4c-4ba9-82da-f49acf3ee2cd"}
2025-07-06 19:28:38.615 | 172.20.0.1 - [Mon, 07 Jul 2025 02:28:38 UTC] "GET /api/v1/subscription/plans HTTP/1.1 200 553.304µs "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36" "
2025-07-06 19:28:38.715 | 
2025-07-06 19:28:38.715 | 2025/07/07 02:28:38 /app/internal/infrastructure/repositories/postgresql/subscription_repository.go:54 record not found
2025-07-06 19:28:38.715 | [103.404ms] [rows:0] SELECT * FROM "subscriptions" WHERE tenant_id = 'ef1a53af-2c4c-4ba9-82da-f49acf3ee2cd' ORDER BY "subscriptions"."id" LIMIT 1
2025-07-06 19:28:38.717 | 172.20.0.1 - [Mon, 07 Jul 2025 02:28:38 UTC] "GET /api/v1/subscription/summary HTTP/1.1 200 106.212699ms "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36" "
2025-07-06 19:28:46.043 | ::1 - [Mon, 07 Jul 2025 02:28:46 UTC] "GET /health HTTP/1.1 200 1.274183ms "Wget" "
2025-07-06 19:28:52.150 | {"time":"2025-07-07T02:28:52.150006364Z","level":"INFO","msg":"OPTIONS preflight request","origin":"http://localhost:3000","allowed":true,"allowedOrigins":["http://localhost:3000","http://localhost:3001"],"environment":"development"}
2025-07-06 19:28:52.151 | 172.20.0.1 - [Mon, 07 Jul 2025 02:28:52 UTC] "GET /api/v1/chat/sessions HTTP/1.1 404 173.621µs "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36" "
2025-07-06 19:28:53.176 | 172.20.0.1 - [Mon, 07 Jul 2025 02:28:53 UTC] "GET /api/v1/chat/sessions HTTP/1.1 404 97.139µs "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36" "
2025-07-06 19:28:55.230 | 172.20.0.1 - [Mon, 07 Jul 2025 02:28:55 UTC] "GET /api/v1/chat/sessions HTTP/1.1 404 442.227µs "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 19:28:59.386 | 172.20.0.1 - [Mon, 07 Jul 2025 02:28:59 UTC] "GET /api/v1/chat/sessions HTTP/1.1 404 138.949µs "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 19:29:16.074 | ::1 - [Mon, 07 Jul 2025 02:29:16 UTC] "GET /health HTTP/1.1 200 902.591µs "Wget" "
2025-07-06 19:29:46.116 | ::1 - [Mon, 07 Jul 2025 02:29:46 UTC] "GET /health HTTP/1.1 200 1.053519ms "Wget" "
2025-07-06 19:30:16.147 | ::1 - [Mon, 07 Jul 2025 02:30:16 UTC] "GET /health HTTP/1.1 200 981.94µs "Wget" "
2025-07-06 19:30:46.183 | ::1 - [Mon, 07 Jul 2025 02:30:46 UTC] "GET /health HTTP/1.1 200 754.9µs "Wget" "
2025-07-06 19:31:16.217 | ::1 - [Mon, 07 Jul 2025 02:31:16 UTC] "GET /health HTTP/1.1 200 941.74µs "Wget" "
2025-07-06 19:31:46.247 | ::1 - [Mon, 07 Jul 2025 02:31:46 UTC] "GET /health HTTP/1.1 200 853.055µs "Wget" "
2025-07-06 19:32:16.280 | ::1 - [Mon, 07 Jul 2025 02:32:16 UTC] "GET /health HTTP/1.1 200 916.056µs "Wget" "
2025-07-06 19:32:46.313 | ::1 - [Mon, 07 Jul 2025 02:32:46 UTC] "GET /health HTTP/1.1 200 1.182553ms "Wget" "
2025-07-06 19:33:16.357 | ::1 - [Mon, 07 Jul 2025 02:33:16 UTC] "GET /health HTTP/1.1 200 907.21µs "Wget" "
2025-07-06 19:33:46.390 | ::1 - [Mon, 07 Jul 2025 02:33:46 UTC] "GET /health HTTP/1.1 200 914.371µs "Wget" "
2025-07-06 19:34:16.426 | ::1 - [Mon, 07 Jul 2025 02:34:16 UTC] "GET /health HTTP/1.1 200 1.128907ms "Wget" "
2025-07-06 19:34:46.464 | ::1 - [Mon, 07 Jul 2025 02:34:46 UTC] "GET /health HTTP/1.1 200 1.398367ms "Wget" "
2025-07-06 19:35:16.497 | ::1 - [Mon, 07 Jul 2025 02:35:16 UTC] "GET /health HTTP/1.1 200 1.439917ms "Wget" "
2025-07-06 19:35:46.538 | ::1 - [Mon, 07 Jul 2025 02:35:46 UTC] "GET /health HTTP/1.1 200 1.223318ms "Wget" "
2025-07-06 19:36:16.576 | ::1 - [Mon, 07 Jul 2025 02:36:16 UTC] "GET /health HTTP/1.1 200 5.779044ms "Wget" "
2025-07-06 19:36:46.609 | ::1 - [Mon, 07 Jul 2025 02:36:46 UTC] "GET /health HTTP/1.1 200 886.297µs "Wget" "
2025-07-06 19:37:16.642 | ::1 - [Mon, 07 Jul 2025 02:37:16 UTC] "GET /health HTTP/1.1 200 1.075739ms "Wget" "
2025-07-06 19:37:46.687 | ::1 - [Mon, 07 Jul 2025 02:37:46 UTC] "GET /health HTTP/1.1 200 872.864µs "Wget" "
2025-07-06 19:38:16.721 | ::1 - [Mon, 07 Jul 2025 02:38:16 UTC] "GET /health HTTP/1.1 200 1.024595ms "Wget" "
2025-07-06 19:38:46.754 | ::1 - [Mon, 07 Jul 2025 02:38:46 UTC] "GET /health HTTP/1.1 200 648.258µs "Wget" "
2025-07-06 19:39:16.789 | ::1 - [Mon, 07 Jul 2025 02:39:16 UTC] "GET /health HTTP/1.1 200 968.451µs "Wget" "
2025-07-06 19:39:46.826 | ::1 - [Mon, 07 Jul 2025 02:39:46 UTC] "GET /health HTTP/1.1 200 1.431803ms "Wget" "
2025-07-06 19:40:16.865 | ::1 - [Mon, 07 Jul 2025 02:40:16 UTC] "GET /health HTTP/1.1 200 5.655957ms "Wget" "
2025-07-06 19:40:46.901 | ::1 - [Mon, 07 Jul 2025 02:40:46 UTC] "GET /health HTTP/1.1 200 1.265844ms "Wget" "
2025-07-06 19:41:16.936 | ::1 - [Mon, 07 Jul 2025 02:41:16 UTC] "GET /health HTTP/1.1 200 1.391682ms "Wget" "
2025-07-06 19:41:46.969 | ::1 - [Mon, 07 Jul 2025 02:41:46 UTC] "GET /health HTTP/1.1 200 700.008µs "Wget" "
2025-07-06 19:42:17.004 | ::1 - [Mon, 07 Jul 2025 02:42:17 UTC] "GET /health HTTP/1.1 200 775.993µs "Wget" "
2025-07-06 19:42:47.039 | ::1 - [Mon, 07 Jul 2025 02:42:47 UTC] "GET /health HTTP/1.1 200 693.958µs "Wget" "
2025-07-06 19:43:17.073 | ::1 - [Mon, 07 Jul 2025 02:43:17 UTC] "GET /health HTTP/1.1 200 796.417µs "Wget" "
2025-07-06 19:43:47.120 | ::1 - [Mon, 07 Jul 2025 02:43:47 UTC] "GET /health HTTP/1.1 200 1.920681ms "Wget" "
2025-07-06 19:44:17.168 | ::1 - [Mon, 07 Jul 2025 02:44:17 UTC] "GET /health HTTP/1.1 200 1.061686ms "Wget" "
2025-07-06 19:44:47.212 | ::1 - [Mon, 07 Jul 2025 02:44:47 UTC] "GET /health HTTP/1.1 200 838.896µs "Wget" "
2025-07-06 19:45:17.247 | ::1 - [Mon, 07 Jul 2025 02:45:17 UTC] "GET /health HTTP/1.1 200 908.548µs "Wget" "
2025-07-06 19:45:47.304 | ::1 - [Mon, 07 Jul 2025 02:45:47 UTC] "GET /health HTTP/1.1 200 935.636µs "Wget" "
2025-07-06 19:46:17.344 | ::1 - [Mon, 07 Jul 2025 02:46:17 UTC] "GET /health HTTP/1.1 200 1.127971ms "Wget" "
2025-07-06 19:46:47.374 | ::1 - [Mon, 07 Jul 2025 02:46:47 UTC] "GET /health HTTP/1.1 200 883.466µs "Wget" "
2025-07-06 19:47:17.417 | ::1 - [Mon, 07 Jul 2025 02:47:17 UTC] "GET /health HTTP/1.1 200 1.958137ms "Wget" "
2025-07-06 19:47:47.454 | ::1 - [Mon, 07 Jul 2025 02:47:47 UTC] "GET /health HTTP/1.1 200 870.758µs "Wget" "
2025-07-06 19:48:17.489 | ::1 - [Mon, 07 Jul 2025 02:48:17 UTC] "GET /health HTTP/1.1 200 878.853µs "Wget" "
2025-07-06 19:48:47.537 | ::1 - [Mon, 07 Jul 2025 02:48:47 UTC] "GET /health HTTP/1.1 200 1.048216ms "Wget" "
2025-07-06 19:49:17.576 | ::1 - [Mon, 07 Jul 2025 02:49:17 UTC] "GET /health HTTP/1.1 200 1.082757ms "Wget" "
2025-07-06 19:49:47.686 | ::1 - [Mon, 07 Jul 2025 02:49:47 UTC] "GET /health HTTP/1.1 200 1.515002ms "Wget" "
2025-07-06 19:50:17.721 | ::1 - [Mon, 07 Jul 2025 02:50:17 UTC] "GET /health HTTP/1.1 200 1.346498ms "Wget" "
2025-07-06 19:50:47.762 | ::1 - [Mon, 07 Jul 2025 02:50:47 UTC] "GET /health HTTP/1.1 200 755.093µs "Wget" "
2025-07-06 19:51:17.797 | ::1 - [Mon, 07 Jul 2025 02:51:17 UTC] "GET /health HTTP/1.1 200 881.153µs "Wget" "
2025-07-06 19:51:47.839 | ::1 - [Mon, 07 Jul 2025 02:51:47 UTC] "GET /health HTTP/1.1 200 5.751904ms "Wget" "
2025-07-06 19:52:17.875 | ::1 - [Mon, 07 Jul 2025 02:52:17 UTC] "GET /health HTTP/1.1 200 1.531723ms "Wget" "
2025-07-06 19:52:47.918 | ::1 - [Mon, 07 Jul 2025 02:52:47 UTC] "GET /health HTTP/1.1 200 5.753268ms "Wget" "
2025-07-06 19:53:17.959 | ::1 - [Mon, 07 Jul 2025 02:53:17 UTC] "GET /health HTTP/1.1 200 1.308144ms "Wget" "
2025-07-06 19:53:48.003 | ::1 - [Mon, 07 Jul 2025 02:53:48 UTC] "GET /health HTTP/1.1 200 6.027199ms "Wget" "
2025-07-06 19:54:18.037 | ::1 - [Mon, 07 Jul 2025 02:54:18 UTC] "GET /health HTTP/1.1 200 760.582µs "Wget" "
2025-07-06 19:54:48.079 | ::1 - [Mon, 07 Jul 2025 02:54:48 UTC] "GET /health HTTP/1.1 200 3.779462ms "Wget" "
2025-07-06 19:55:18.114 | ::1 - [Mon, 07 Jul 2025 02:55:18 UTC] "GET /health HTTP/1.1 200 987.389µs "Wget" "
2025-07-06 19:55:48.146 | ::1 - [Mon, 07 Jul 2025 02:55:48 UTC] "GET /health HTTP/1.1 200 689.893µs "Wget" "
2025-07-06 19:56:18.181 | ::1 - [Mon, 07 Jul 2025 02:56:18 UTC] "GET /health HTTP/1.1 200 1.05496ms "Wget" "
2025-07-06 19:56:48.217 | ::1 - [Mon, 07 Jul 2025 02:56:48 UTC] "GET /health HTTP/1.1 200 834.441µs "Wget" "
2025-07-06 19:57:18.249 | ::1 - [Mon, 07 Jul 2025 02:57:18 UTC] "GET /health HTTP/1.1 200 1.338992ms "Wget" "
2025-07-06 19:57:48.293 | ::1 - [Mon, 07 Jul 2025 02:57:48 UTC] "GET /health HTTP/1.1 200 798.578µs "Wget" "
2025-07-06 19:58:18.330 | ::1 - [Mon, 07 Jul 2025 02:58:18 UTC] "GET /health HTTP/1.1 200 1.094869ms "Wget" "
2025-07-06 19:58:48.394 | ::1 - [Mon, 07 Jul 2025 02:58:48 UTC] "GET /health HTTP/1.1 200 1.474939ms "Wget" "
2025-07-06 19:59:18.464 | ::1 - [Mon, 07 Jul 2025 02:59:18 UTC] "GET /health HTTP/1.1 200 1.365165ms "Wget" "
2025-07-06 19:59:41.023 | 172.20.0.1 - [Mon, 07 Jul 2025 02:59:41 UTC] "GET /api/v1/chat/sessions HTTP/1.1 404 1.150348ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 19:59:48.504 | ::1 - [Mon, 07 Jul 2025 02:59:48 UTC] "GET /health HTTP/1.1 200 1.21615ms "Wget" "
2025-07-06 20:00:18.549 | ::1 - [Mon, 07 Jul 2025 03:00:18 UTC] "GET /health HTTP/1.1 200 2.214889ms "Wget" "
2025-07-06 20:00:46.162 | {"time":"2025-07-07T03:00:46.161560765Z","level":"INFO","msg":"OPTIONS preflight request","origin":"http://localhost:3000","allowed":true,"allowedOrigins":["http://localhost:3000","http://localhost:3001"],"environment":"development"}
2025-07-06 20:00:46.169 | {"time":"2025-07-07T03:00:46.168646954Z","level":"ERROR","msg":"Failed to get subscription summary from cache","error":"key not found","tenant_id":"ef1a53af-2c4c-4ba9-82da-f49acf3ee2cd"}
2025-07-06 20:00:46.173 | 172.20.0.1 - [Mon, 07 Jul 2025 03:00:46 UTC] "GET /chat/sessions HTTP/1.1 404 1.344976ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:00:46.240 | 
2025-07-06 20:00:46.240 | 2025/07/07 03:00:46 /app/internal/infrastructure/repositories/postgresql/subscription_repository.go:54 record not found
2025-07-06 20:00:46.240 | [69.505ms] [rows:0] SELECT * FROM "subscriptions" WHERE tenant_id = 'ef1a53af-2c4c-4ba9-82da-f49acf3ee2cd' ORDER BY "subscriptions"."id" LIMIT 1
2025-07-06 20:00:46.240 | 172.20.0.1 - [Mon, 07 Jul 2025 03:00:46 UTC] "GET /api/v1/subscription/summary HTTP/1.1 200 77.710183ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:00:48.564 | {"time":"2025-07-07T03:00:48.564682714Z","level":"INFO","msg":"OPTIONS preflight request","origin":"http://localhost:3000","allowed":true,"allowedOrigins":["http://localhost:3000","http://localhost:3001"],"environment":"development"}
2025-07-06 20:00:48.566 | 172.20.0.1 - [Mon, 07 Jul 2025 03:00:48 UTC] "GET /chat/sessions HTTP/1.1 404 1.98739ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:00:48.571 | 172.20.0.1 - [Mon, 07 Jul 2025 03:00:48 UTC] "GET /api/v1/auth/validate HTTP/1.1 200 3.192268ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:00:48.597 | ::1 - [Mon, 07 Jul 2025 03:00:48 UTC] "GET /health HTTP/1.1 200 689.306µs "Wget" "
2025-07-06 20:01:15.510 | 172.20.0.1 - [Mon, 07 Jul 2025 03:01:15 UTC] "GET /chat/sessions HTTP/1.1 404 2.288892ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:01:18.633 | ::1 - [Mon, 07 Jul 2025 03:01:18 UTC] "GET /health HTTP/1.1 200 817.557µs "Wget" "
2025-07-06 20:01:48.664 | ::1 - [Mon, 07 Jul 2025 03:01:48 UTC] "GET /health HTTP/1.1 200 1.279997ms "Wget" "
2025-07-06 20:02:18.701 | ::1 - [Mon, 07 Jul 2025 03:02:18 UTC] "GET /health HTTP/1.1 200 889.428µs "Wget" "
2025-07-06 20:02:48.736 | ::1 - [Mon, 07 Jul 2025 03:02:48 UTC] "GET /health HTTP/1.1 200 1.378487ms "Wget" "
2025-07-06 20:03:18.790 | ::1 - [Mon, 07 Jul 2025 03:03:18 UTC] "GET /health HTTP/1.1 200 1.381794ms "Wget" "
2025-07-06 20:03:48.829 | ::1 - [Mon, 07 Jul 2025 03:03:48 UTC] "GET /health HTTP/1.1 200 5.776775ms "Wget" "
2025-07-06 20:04:18.878 | ::1 - [Mon, 07 Jul 2025 03:04:18 UTC] "GET /health HTTP/1.1 200 996.274µs "Wget" "
2025-07-06 20:04:48.915 | ::1 - [Mon, 07 Jul 2025 03:04:48 UTC] "GET /health HTTP/1.1 200 697.127µs "Wget" "
2025-07-06 20:05:18.949 | ::1 - [Mon, 07 Jul 2025 03:05:18 UTC] "GET /health HTTP/1.1 200 804.72µs "Wget" "
2025-07-06 20:05:48.992 | ::1 - [Mon, 07 Jul 2025 03:05:48 UTC] "GET /health HTTP/1.1 200 5.458729ms "Wget" "
2025-07-06 20:06:19.032 | ::1 - [Mon, 07 Jul 2025 03:06:19 UTC] "GET /health HTTP/1.1 200 1.058011ms "Wget" "
2025-07-06 20:06:49.064 | ::1 - [Mon, 07 Jul 2025 03:06:49 UTC] "GET /health HTTP/1.1 200 717.05µs "Wget" "
2025-07-06 20:07:07.288 | 172.20.0.1 - [Mon, 07 Jul 2025 03:07:07 UTC] "GET /chat/sessions HTTP/1.1 404 1.480211ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:07:09.347 | 172.20.0.1 - [Mon, 07 Jul 2025 03:07:09 UTC] "GET /chat/sessions HTTP/1.1 404 1.13764ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:07:10.430 | 172.20.0.1 - [Mon, 07 Jul 2025 03:07:10 UTC] "GET /chat/sessions HTTP/1.1 404 719.604µs "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:07:10.434 | 172.20.0.1 - [Mon, 07 Jul 2025 03:07:10 UTC] "GET /api/v1/auth/validate HTTP/1.1 200 1.495167ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:07:10.657 | {"time":"2025-07-07T03:07:10.657201212Z","level":"ERROR","msg":"Failed to get subscription summary from cache","error":"key not found","tenant_id":"ef1a53af-2c4c-4ba9-82da-f49acf3ee2cd"}
2025-07-06 20:07:10.712 | 
2025-07-06 20:07:10.712 | 2025/07/07 03:07:10 /app/internal/infrastructure/repositories/postgresql/subscription_repository.go:54 record not found
2025-07-06 20:07:10.712 | [54.595ms] [rows:0] SELECT * FROM "subscriptions" WHERE tenant_id = 'ef1a53af-2c4c-4ba9-82da-f49acf3ee2cd' ORDER BY "subscriptions"."id" LIMIT 1
2025-07-06 20:07:10.712 | 172.20.0.1 - [Mon, 07 Jul 2025 03:07:10 UTC] "GET /api/v1/subscription/summary HTTP/1.1 200 56.871436ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:07:11.513 | 172.20.0.1 - [Mon, 07 Jul 2025 03:07:11 UTC] "GET /chat/sessions HTTP/1.1 404 496.092µs "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:07:13.523 | 172.20.0.1 - [Mon, 07 Jul 2025 03:07:13 UTC] "GET /chat/sessions HTTP/1.1 404 730.654µs "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:07:17.545 | 172.20.0.1 - [Mon, 07 Jul 2025 03:07:17 UTC] "GET /chat/sessions HTTP/1.1 404 2.155416ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:07:19.110 | ::1 - [Mon, 07 Jul 2025 03:07:19 UTC] "GET /health HTTP/1.1 200 1.619166ms "Wget" "
2025-07-06 20:07:49.163 | ::1 - [Mon, 07 Jul 2025 03:07:49 UTC] "GET /health HTTP/1.1 200 1.092617ms "Wget" "
2025-07-06 20:08:19.206 | ::1 - [Mon, 07 Jul 2025 03:08:19 UTC] "GET /health HTTP/1.1 200 1.00204ms "Wget" "
2025-07-06 20:08:49.252 | ::1 - [Mon, 07 Jul 2025 03:08:49 UTC] "GET /health HTTP/1.1 200 1.122808ms "Wget" "
2025-07-06 20:09:19.291 | ::1 - [Mon, 07 Jul 2025 03:09:19 UTC] "GET /health HTTP/1.1 200 788.123µs "Wget" "
2025-07-06 20:09:49.386 | ::1 - [Mon, 07 Jul 2025 03:09:49 UTC] "GET /health HTTP/1.1 200 1.219404ms "Wget" "
2025-07-06 20:10:19.443 | ::1 - [Mon, 07 Jul 2025 03:10:19 UTC] "GET /health HTTP/1.1 200 866.736µs "Wget" "
2025-07-06 20:10:49.522 | ::1 - [Mon, 07 Jul 2025 03:10:49 UTC] "GET /health HTTP/1.1 200 1.813233ms "Wget" "
2025-07-06 20:11:19.572 | ::1 - [Mon, 07 Jul 2025 03:11:19 UTC] "GET /health HTTP/1.1 200 1.072623ms "Wget" "
2025-07-06 20:11:36.984 | 172.20.0.1 - [Mon, 07 Jul 2025 03:11:36 UTC] "GET /chat/sessions HTTP/1.1 404 1.704609ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:11:36.984 | 172.20.0.1 - [Mon, 07 Jul 2025 03:11:36 UTC] "GET /api/v1/auth/validate HTTP/1.1 200 1.036509ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:11:38.059 | 172.20.0.1 - [Mon, 07 Jul 2025 03:11:38 UTC] "GET /chat/sessions HTTP/1.1 404 1.062107ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:11:40.080 | 172.20.0.1 - [Mon, 07 Jul 2025 03:11:40 UTC] "GET /chat/sessions HTTP/1.1 404 1.06431ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:11:44.099 | 172.20.0.1 - [Mon, 07 Jul 2025 03:11:44 UTC] "GET /chat/sessions HTTP/1.1 404 2.04724ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:11:49.613 | ::1 - [Mon, 07 Jul 2025 03:11:49 UTC] "GET /health HTTP/1.1 200 1.609947ms "Wget" "
2025-07-06 20:12:19.659 | ::1 - [Mon, 07 Jul 2025 03:12:19 UTC] "GET /health HTTP/1.1 200 1.080905ms "Wget" "
2025-07-06 20:12:49.706 | ::1 - [Mon, 07 Jul 2025 03:12:49 UTC] "GET /health HTTP/1.1 200 1.126459ms "Wget" "
2025-07-06 20:13:19.751 | ::1 - [Mon, 07 Jul 2025 03:13:19 UTC] "GET /health HTTP/1.1 200 1.205802ms "Wget" "
2025-07-06 20:13:49.799 | ::1 - [Mon, 07 Jul 2025 03:13:49 UTC] "GET /health HTTP/1.1 200 5.933322ms "Wget" "
2025-07-06 20:14:19.846 | ::1 - [Mon, 07 Jul 2025 03:14:19 UTC] "GET /health HTTP/1.1 200 1.210529ms "Wget" "
2025-07-06 20:14:41.883 | 172.20.0.1 - [Mon, 07 Jul 2025 03:14:41 UTC] "GET /chat/sessions HTTP/1.1 404 2.546797ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:14:41.886 | 172.20.0.1 - [Mon, 07 Jul 2025 03:14:41 UTC] "GET /api/v1/auth/validate HTTP/1.1 200 1.743517ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:14:42.141 | {"time":"2025-07-07T03:14:42.140709826Z","level":"ERROR","msg":"Failed to get subscription summary from cache","error":"key not found","tenant_id":"ef1a53af-2c4c-4ba9-82da-f49acf3ee2cd"}
2025-07-06 20:14:42.199 | 
2025-07-06 20:14:42.199 | 2025/07/07 03:14:42 /app/internal/infrastructure/repositories/postgresql/subscription_repository.go:54 record not found
2025-07-06 20:14:42.199 | [57.681ms] [rows:0] SELECT * FROM "subscriptions" WHERE tenant_id = 'ef1a53af-2c4c-4ba9-82da-f49acf3ee2cd' ORDER BY "subscriptions"."id" LIMIT 1
2025-07-06 20:14:42.199 | 172.20.0.1 - [Mon, 07 Jul 2025 03:14:42 UTC] "GET /api/v1/subscription/summary HTTP/1.1 200 70.175037ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:14:42.987 | 172.20.0.1 - [Mon, 07 Jul 2025 03:14:42 UTC] "GET /chat/sessions HTTP/1.1 404 1.935067ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:14:45.155 | 172.20.0.1 - [Mon, 07 Jul 2025 03:14:45 UTC] "GET /chat/sessions HTTP/1.1 404 738.178µs "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:14:49.167 | 172.20.0.1 - [Mon, 07 Jul 2025 03:14:49 UTC] "GET /chat/sessions HTTP/1.1 404 770.325µs "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:14:49.909 | ::1 - [Mon, 07 Jul 2025 03:14:49 UTC] "GET /health HTTP/1.1 200 728.181µs "Wget" "
2025-07-06 20:15:19.946 | ::1 - [Mon, 07 Jul 2025 03:15:19 UTC] "GET /health HTTP/1.1 200 1.410636ms "Wget" "
2025-07-06 20:15:49.982 | ::1 - [Mon, 07 Jul 2025 03:15:49 UTC] "GET /health HTTP/1.1 200 627.463µs "Wget" "
2025-07-06 20:16:20.018 | ::1 - [Mon, 07 Jul 2025 03:16:20 UTC] "GET /health HTTP/1.1 200 1.284578ms "Wget" "
2025-07-06 20:16:50.059 | ::1 - [Mon, 07 Jul 2025 03:16:50 UTC] "GET /health HTTP/1.1 200 1.245033ms "Wget" "
2025-07-06 20:16:53.435 | 172.20.0.1 - [Mon, 07 Jul 2025 03:16:53 UTC] "GET /chat/sessions HTTP/1.1 404 1.843593ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:16:54.505 | 172.20.0.1 - [Mon, 07 Jul 2025 03:16:54 UTC] "GET /chat/sessions HTTP/1.1 404 1.431483ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:16:56.521 | 172.20.0.1 - [Mon, 07 Jul 2025 03:16:56 UTC] "GET /chat/sessions HTTP/1.1 404 1.385738ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:17:00.553 | 172.20.0.1 - [Mon, 07 Jul 2025 03:17:00 UTC] "GET /chat/sessions HTTP/1.1 404 2.381327ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:17:20.102 | ::1 - [Mon, 07 Jul 2025 03:17:20 UTC] "GET /health HTTP/1.1 200 1.280522ms "Wget" "
2025-07-06 20:17:20.289 | 172.20.0.1 - [Mon, 07 Jul 2025 03:17:20 UTC] "GET /chat/sessions HTTP/1.1 404 476.382µs "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:17:50.152 | ::1 - [Mon, 07 Jul 2025 03:17:50 UTC] "GET /health HTTP/1.1 200 1.12242ms "Wget" "
2025-07-06 20:18:20.195 | ::1 - [Mon, 07 Jul 2025 03:18:20 UTC] "GET /health HTTP/1.1 200 992.469µs "Wget" "
2025-07-06 20:18:50.229 | ::1 - [Mon, 07 Jul 2025 03:18:50 UTC] "GET /health HTTP/1.1 200 807.405µs "Wget" "
2025-07-06 20:19:13.831 | 172.20.0.1 - [Mon, 07 Jul 2025 03:19:13 UTC] "GET /chat/sessions HTTP/1.1 404 1.768549ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:19:15.883 | 172.20.0.1 - [Mon, 07 Jul 2025 03:19:15 UTC] "GET /chat/sessions HTTP/1.1 404 7.513724ms "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1" "
2025-07-06 20:19:20.275 | ::1 - [Mon, 07 Jul 2025 03:19:20 UTC] "GET /health HTTP/1.1 200 2.037349ms "Wget" "
2025-07-06 20:19:50.299 | ::1 - [Mon, 07 Jul 2025 03:19:50 UTC] "GET /health HTTP/1.1 200 656.731µs "Wget" "