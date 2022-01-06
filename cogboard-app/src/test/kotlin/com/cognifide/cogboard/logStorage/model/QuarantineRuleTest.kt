package com.cognifide.cogboard.logStorage.model

import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.assertEquals

class QuarantineRuleTest {
    @Test
    fun `Properly parses correct rule`() {
        val rule = QuarantineRule.from(JsonObject("""
            {
                "label": "Example label",
                "reasonField": "Reason",
                "regExp": "^a",
                "checked": true,
                "endTimestamp": 1641491404
            }
        """))
        assertEquals("Example label", rule.label)
        assertEquals("Reason", rule.reasonField)
        assertEquals("^a", rule.regex.pattern)
        assertEquals(true, rule.enabled)
        assertEquals(1641491404, rule.endTimestamp?.epochSecond)
    }

    @Test
    fun `Properly parses a rule without end timestamp`() {
        val rule = QuarantineRule.from(JsonObject("""
            {
                "label": "Example label",
                "reasonField": "Reason",
                "regExp": "^a",
                "checked": true
            }
        """))
        assertEquals("Example label", rule.label)
        assertEquals("Reason", rule.reasonField)
        assertEquals("^a", rule.regex.pattern)
        assertEquals(true, rule.enabled)
        assertEquals(null, rule.endTimestamp)
    }

    @Test
    fun `Returns default rule when incorrect`() {
        val rule = QuarantineRule.from(JsonObject("""
            {
                "Field1": "Example field",
                "SecondField": 2,
                "Another field": "Lorem ipsum",
                "Last field": []
            }
        """))
        assertEquals("Default", rule.label)
        assertEquals("", rule.reasonField)
        assertEquals("(?!x)x", rule.regex.pattern)
        assertEquals(false, rule.enabled)
        assertEquals(null, rule.endTimestamp)
    }

    @Test
    fun `Empty JSON array creates empty rules array`() {
        val rules = QuarantineRule.from(JsonArray("[]"))
        assertEquals(0, rules.size)
    }

    @Test
    fun `Correctly parses rules in array`() {
        val rules = QuarantineRule.from(JsonArray("""
            [
                {
                    "label":"Example label",
                    "reasonField":"Reason",
                    "regExp":"^a",
                    "checked":true,
                    "endTimestamp": 1641491404
                },
                {
                    "label":"Example label",
                    "reasonField":"Reason",
                    "regExp":"^a",
                    "checked":true
                }
            ]
            """))
        assertEquals(2, rules.size)
        assertEquals("Example label", rules[0].label)
        assertEquals("Reason", rules[0].reasonField)
        assertEquals("^a", rules[0].regex.pattern)
        assertEquals(true, rules[0].enabled)
        assertEquals(1641491404, rules[0].endTimestamp?.epochSecond)
        assertEquals("Example label", rules[1].label)
        assertEquals("Reason", rules[1].reasonField)
        assertEquals("^a", rules[1].regex.pattern)
        assertEquals(true, rules[1].enabled)
        assertEquals(null, rules[1].endTimestamp)
    }
}