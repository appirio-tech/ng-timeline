window.FIXTURES = {
    "bower_components/work-api-schema/work-api-schema.json": {
        "swagger": "2.0",
        "info": {
                "description": "Move your app forward with the Uber API",
                "version": "1.0.0",
                "title": "Uber API"
        },
        "host": "api.topcoder-dev.com",
        "basePath": "/v3/events",
        "schemes": [
                "https"
        ],
        "produces": [
                "application/json"
        ],
        "paths": {
                "": {
                        "get": {
                                "tags": [
                                        "abc"
                                ],
                                "summary": "This is a Summary",
                                "description": "This is a description",
                                "parameters": [
                                        {
                                                "name": "filter",
                                                "in": "query",
                                                "description": "This is a description",
                                                "required": true,
                                                "type": "string"
                                        }
                                ],
                                "responses": {
                                        "200": {
                                                "description": "This is a description",
                                                "schema": {
                                                        "type": "object",
                                                        "items": {
                                                                "$ref": "#/definitions/Event"
                                                        }
                                                }
                                        },
                                        "default": {
                                                "description": "Unexpected error",
                                                "schema": {
                                                        "$ref": "#/definitions/Error"
                                                }
                                        }
                                }
                        }
                }
        },
        "definitions": {
                "Event": {
                        "properties": {
                                "id": {
                                        "type": "string"
                                },
                                "result": {
                                        "type": "object",
                                        "items": {
                                                "$ref": "#/definitions/EventResult"
                                        }
                                }
                        }
                },
                "EventResult": {
                        "properties": {
                                "content": {
                                        "type": "array",
                                        "items": {
                                                "$ref": "#/definitions/EventContent"
                                        }
                                }
                        }
                },
                "EventContent": {
                        "properties": {
                                "version": {
                                        "type": "number"
                                },
                                "id": {
                                        "type": "string"
                                },
                                "modifiedBy": {
                                        "type": "string"
                                },
                                "modifiedAt": {
                                        "type": "string",
                                        "sample": "2015-05-05T20:53:41.467Z"
                                },
                                "createdBy": {
                                        "type": "string"
                                },
                                "createdAt": {
                                        "type": "string",
                                        "sample": "2015-05-05T20:53:41.467Z"
                                },
                                "ownerId": {
                                        "type": "string"
                                },
                                "sourceObjectType": {
                                        "type": "string",
                                        "enum": [
                                                "app-work-requests"
                                        ]
                                },
                                "sourceObjectId": {
                                        "type": "string"
                                },
                                "eventType": {
                                        "type": "string",
                                        "enum": [
                                                "timeline"
                                        ]
                                },
                                "eventSubType": {
                                        "type": "string",
                                        "enum": [
                                                "copilot-assigned",
                                                "created",
                                                "submitted",
                                                "quote-created",
                                                "email-verified",
                                                "payment-accepted",
                                                "challenge-feedback-provided",
                                                "challenge-submission",
                                                "challenge-member-registered",
                                                "challenge-finalists-selected",
                                                "state-change",
                                                "launched",
                                                "checkpoint1",
                                                "finalists",
                                                "final-design",
                                                "winner",
                                                "final-feedback",
                                                "completed"
                                        ]
                                },
                                "sourceObjectContent": {
                                        "type": "string",
                                        "sample": "{\"version\":14,\"id\":\"1427467795351:af449f69-e4ed-4325-a184-c9be1da5dd46\",\"modifiedBy\":\"40097202\",\"modifiedAt\":1430859249850,\"createdBy\":\"40097202\",\"createdAt\":1427467795351,\"name\":\"name used for test\",\"summary\":\"testing of the summary\",\"requestType\":\"Design&Code\",\"ownerId\":\"40097202\",\"competitorApps\":[\"comp 0\",\"comp 1\",\"comp 3\",\"comp 4\"],\"usageDescription\":\"usage - updated now\",\"features\":[{\"name\":\"feature1.0\",\"description\":\"desc1\"},{\"name\":\"feature2\",\"description\":\"desc2.0\"}],\"costEstimate\":{\"low\":\"3600\",\"high\":\"4400\"},\"status\":\"submitted\",\"statusNotes\":null,\"copilotId\":\"co-pilot\",\"quotedAmount\":null}"
                                },
                                "userId": {
                                        "type": "string"
                                },
                                "fieldChanges": {
                                        "type": "string"
                                }
                        }
                },
                "SourceObjectContent": {},
                "Error": {
                        "properties": {
                                "code": {
                                        "type": "integer",
                                        "format": "int32"
                                },
                                "message": {
                                        "type": "string"
                                },
                                "fields": {
                                        "type": "string"
                                }
                        }
                }
        }
}
};