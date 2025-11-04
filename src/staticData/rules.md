# Rule description

```json
{
  "ruleId": "id of rule",
  "name": "name of rule",
  "content": "Something like a title",
  "description": "Description",
  "tip": "tip",
  "rule": {
    "name": "name of original rule",
    "link": "link to original rule"
  },
  "a11yFriendUrl": "our link",
  "responsibility": [
    "Could be anybody, currently only developer or editor defined"
  ],
  "impact": "NUMBER -> 0 to 5, 0 is lowest and 5 is highest",
  "complexity": "NUMBER -> 0 to 5, 0 is lowest and 5 is highest",
  "test": {
    "element": "element tag",
    "rule": "regex to match the rule",
    "attribute": "alt"
  }
}
```