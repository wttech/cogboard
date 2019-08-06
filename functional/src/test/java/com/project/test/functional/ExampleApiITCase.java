package com.project.test.functional;


import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

@Disabled
class ExampleApiITCase {

    @Test
    @DisplayName("Expect 200 status code from config api.")
    void callConfigApiAndExpectOK() {
        // @formatter:off
        given().
                port(8092).
                when().
                get("http://localhost:8092/api/config").
                then()
                .assertThat().
                statusCode(200);
        // @formatter:on
    }

    @Test
    @DisplayName("Expect 200 status code from endpoints api.")
    void callEndpointsAndExpectOK() {
        // @formatter:off
        given().
                port(8092).
                when().
                get("http://localhost:8092/api/endpoints").
                then()
                .assertThat().
                statusCode(200);
        // @formatter:on
    }

}
