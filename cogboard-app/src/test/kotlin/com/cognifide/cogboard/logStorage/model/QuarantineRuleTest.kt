package com.cognifide.cogboard.logStorage.model

import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.assertEquals

class QuarantineRuleTest {
    @Test
    fun `Properly parses correct rule`() {
        val rule = QuarantineRule.from(JsonObject("""{"label": "Example label", "reasonField": "Reason", "regExp": "^a", "checked": true}"""))
        assertEquals("Example label", rule.label)
        assertEquals("Reason", rule.reasonField)
        assertEquals("^a", rule.regex.pattern)
        assertEquals(true, rule.enabled)
        assertEquals(null, rule.endTimestamp)
    }

    @Test
    fun `Returns default rule when incorrect`() {
        val rule = QuarantineRule.from(JsonObject("""{"Field1": "Example field", "SecondField": 2, "Another field": "Lorem ipsum", "Last field": []}"""))
        assertEquals("Default", rule.label)
        assertEquals("", rule.reasonField)
        assertEquals("(?!x)x", rule.regex.pattern)
        assertEquals(false, rule.enabled)
        assertEquals(null, rule.endTimestamp)
    }

    @Test
    fun `Empty JSON array creates empty rules array`() {
        val rules = QuarantineRule.from(JsonArray("[]"))
        assertEquals(rules.size, 0)
    }

    @Test
    fun `Correctly parses rules in array`() {
        val rules = QuarantineRule.from(JsonArray("""[{"label": "Example label", "reasonField": "Reason", "regExp": "^a", "checked": true}]"""))
        assertEquals("Example label", rules[0].label)
        assertEquals("Reason", rules[0].reasonField)
        assertEquals("^a", rules[0].regex.pattern)
        assertEquals(true, rules[0].enabled)
        assertEquals(null, rules[0].endTimestamp)
    }
}