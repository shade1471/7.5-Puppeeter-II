Feature: Booking a movie-1 ticket for tomorrow
    Scenario: The user must select a seat and order a ticket
        Given user is on "/index.php" page
        When user select day and movie
        And select and book 8 row and 6 seat
        Then user received confirmation and gr-code
    Scenario: The user wants to check if the seat is booked
        Given user is on "/index.php" page
        When user select day and movie
        And select and book 5 row and 7 seat
        And user is on "/index.php" page
        And user select day and movie
        And see that 5 row and 7 seat is taken
        Then Book button is not active
