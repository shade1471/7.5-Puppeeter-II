Feature: Booking a movie-1 ticket for tomorrow
    Scenario: The user must select a seat and order a ticket
        Given user is on "/index.php" page
        When user select 2-th day and movie
        And select and book 1 row and 1 seat
        Then user received confirmation and qr-code
    Scenario: The user wants to check if the seat is booked
        Given user is on "/index.php" page
        When user select 2-th day and movie
        And select and book 2 row and 1 seat
        And user is on "/index.php" page
        And user select 2-th day and movie
        And sees that 2 row and 1 seat is taken
        Then Book button is not active
    Scenario: Should order three tickets for Movie-1 in a week
        Given user is on "/index.php" page
        When user select 7-th day and movie
        And select and book 1 row and 1,2,3 seats
        Then user received confirmation and qr-code
