# SQLite Inspector Tests

## Overview

This directory contains tests for the SQLite Inspector application using @jest/globals.

## Test Files

### ✅ `sqliteDump.unit.test.ts` (30 tests - All Passing)

Pure unit tests for SQL dump utility functions. These tests verify:

- **Identifier Quoting**: Keywords, special characters, alphanumeric validation
- **String Escaping**: Single quotes, newlines, carriage returns
- **Value Formatting**: All SQLite types (INTEGER, FLOAT, NULL, TEXT, BLOB)
- **Edge Cases**: Unicode, long strings, empty strings, all byte values

These tests run successfully because they don't require native modules.

### ⚠️ `sqliteDump.test.ts` (Requires Native Module)

Integration tests for the full dump/import cycle using actual expo-sqlite database operations. These tests verify:

- Table creation and data preservation
- Special characters and escaping in real SQL
- ROWID preservation
- Indexes and constraints

**Status**: Cannot run due to React Native/expo-sqlite requiring native environment.

### ⚠️ `sqliteDump.integration.test.ts` (Requires Native Module)

Comprehensive roundtrip tests verifying data integrity through export/import cycles:

- NULL value preservation
- BLOB data preservation
- Multiple tables with foreign keys
- Complex schemas

**Status**: Cannot run due to React Native/expo-sqlite requiring native environment.

### ⚠️ `../hooks/__tests__/useSQLiteDatabase.integration.test.ts` (Requires Native Module)

Tests for database operations including:

- Binary database detection and loading
- KV store detection
- Table operations (list, schema, pagination)
- CRUD operations
- Error handling

**Status**: Cannot run due to React Native/expo-sqlite requiring native environment.

### ⚠️ `../hooks/__tests__/useDevToolsConnection.integration.test.ts` (Requires Native Module)

Tests for DevTools plugin communication:

- Message protocol serialization
- Data integrity through serialization
- Mock DevTools client behavior
- Error scenarios

**Status**: Cannot run due to React Native/expo-sqlite requiring native environment.

## Running Tests

```bash
# Run all passing unit tests
bun test src/lib/__tests__/sqliteDump.unit.test.ts

# Try to run all tests (will show native module errors)
bun test
```

## Known Limitations

### React Native / expo-sqlite Compatibility

The integration tests cannot run in Bun's test environment because:

1. **expo-sqlite** is a native module that requires React Native runtime
2. React Native uses Flow type syntax that Bun doesn't support
3. The tests need actual SQLite database operations which aren't available in Bun's test environment

### Recommendations for Full Test Coverage

To run the full integration tests, consider:

1. **Use Expo/React Native test environment**:
   - Set up Jest with React Native preset
   - Use `@testing-library/react-native` for component tests
   - Tests will run in a proper React Native environment

2. **E2E Testing**:
   - Use Detox or Maestro for end-to-end testing
   - Run tests on actual devices or simulators

3. **Manual Testing**:
   - The unit tests verify the core SQL generation logic
   - Manual testing can verify the integration with expo-sqlite

## Test Coverage Summary

| Category               | Status             | Tests | Notes                      |
| ---------------------- | ------------------ | ----- | -------------------------- |
| SQL Utility Functions  | ✅ Passing         | 30    | Pure logic, no native deps |
| Database Operations    | ⚠️ Requires Native | ~60   | Need React Native runtime  |
| DevTools Communication | ⚠️ Requires Native | ~20   | Need React Native runtime  |

## What's Been Tested

✅ **Successfully Tested** (30 tests passing):

- Identifier quoting and escaping
- String value escaping with special characters
- Value formatting for all SQLite types
- Edge cases (unicode, long strings, binary data)

⚠️ **Implemented but Can't Run** (80+ tests):

- Full dump/import roundtrip with real databases
- Binary database detection and loading
- KV store detection
- CRUD operations
- DevTools message protocol
- Data serialization/deserialization

## Future Improvements

1. Set up Jest with React Native environment for integration tests
2. Add component tests using @testing-library/react
3. Add E2E tests using Detox or Playwright
4. Set up CI/CD to run tests automatically
