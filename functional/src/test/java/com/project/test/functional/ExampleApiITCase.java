package com.project.test.functional;


import static io.restassured.RestAssured.given;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@Disabled
class ExampleApiITCase {

    @Test
    @DisplayName("Expect 200 status code from handlers api.")
    void callHandlersApiEndpointAndExpectOK() {
        // @formatter:off
        given().
                port(8092).
                when().
                get("http://localhost:8092/api/v1/example").
                then()
                .assertThat().
                statusCode(200);
        // @formatter:on
    }

    @Test
    @DisplayName("Expect 200 status code from fragments api.")
    void callFragmentsApiEndpointAndExpectOK() {
        // @formatter:off
        given().
                port(8092).
                when().
                get("http://localhost:8092/api/v2/example").
                then()
                .assertThat().
                statusCode(200);
        // @formatter:on
    }

}
