# Readme

## setup ddb local

```bash
aws dynamodb create-table --table-name samples_table --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --billing-mode PAY_PER_REQUEST --endpoint-url http://localhost:8000
```
