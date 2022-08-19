# aries-ekyc

## Node API for communicating with [ACA-py (version 0.7.0)](https://github.com/hyperledger/aries-cloudagent-python)

ACA-py is, as referenced from their github -
>An easy to use Aries agent for building SSI services using any language that supports sending/receiving HTTP requests.

This set of API includes the following:

1. Send Invitation for an agent (or mobile agent) to connect with ACA-py Faber agent
2. Issue Credential to connected agent
3. Check Status of the issued credential
4. Send Proof Request to the connected agent for verifying the issued VC
5. Check Status of the Proof Request

In order to create a custom schema based on your preference, follow the below steps:

1. Run ACA-py in your machine (from `/demo` folder, using the command `LEDGER_URL=http://dev.greenlight.bcovrin.vonx.io ./run_demo faber`)
2. Go to `http://localhost:8021/schemas`. A sample request body will look like the following:
```
{
    "attributes": [
        "firstname",
        "lastname",
        "age"
    ],
    "schema_name": "boo",
    "schema_version": "1.0" 
}
```
A sample response body should look like the following:
```
{
  "schema_id": "6EfteLyPuyT6Z7ahwzLpei:1:boo:1.0",
  "schema": {
    "ver": "1.0",
    "id": "6EfteLyPuyT6Z7ahwzLpei:1:boo:1.0",
    "name": "boo",
    "version": "1.0",
    "attrNames": [
      "firstname",
      "lastname",
      "age"
    ],
    "seqNo": 146621
  }
}
```

We'll need the `schema_id`, `schema_name`, and `version` for further usage.

### Send Invitation

*Request*
```
{
  "my_label": "booo",
  "recipient_keys": [
    "H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
  ],
  "routing_keys": [
    "H3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
  ],
  "service_endpoint": "http://192.168.56.102:8020"
}
```

*Response*
```
{
    "connection_id": "de484430-2444-4818-86ab-b96b610b7448",
    "invitation_url": "https://7807-103-124-227-68.ap.ngrok.io?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiZWVkNWE5MTAtOThhYi00M2Q3LWI2NWItY2FiMWU4YzVhMmQ0IiwgInNlcnZpY2VFbmRwb2ludCI6ICJodHRwczovLzc4MDctMTAzLTEyNC0yMjctNjguYXAubmdyb2suaW8iLCAicmVjaXBpZW50S2V5cyI6IFsiNUpYTjlwNWhMcDdmN1k4N3d2bkxkM1ZtSk41ekRZQjlMVkJrYVdnYXp0MW8iXSwgImxhYmVsIjogImZhYmVyLmFnZW50In0=",
    "invitation_qr": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVQAAAFUCAYAAAB7ksS1AAAb50lEQVR4AezBQY7YyhIYwUxi7n/ltJa1aphgj/S"
}
```
We'll need to store this `connection_id` for making further API calls from this middleware.


### Issue Credential

*Request*

```
```









