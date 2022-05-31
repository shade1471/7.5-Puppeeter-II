Feature: Booking a movie-1 ticket for tomorrow
    Scenario: The user must select a seat and order a ticket
        Given user is on "/index.php" page
        When user select day and movie and then select 8 row and 4 seat and click button to book
        Then user received confirmation and gr-code
    Scenario: The user wants to check if the seat is booked
        Given user is on "/index.php" page
        When user select day and movie and then try to select 8 row and 4 seat and sees that seat is taken
        Then user go back to main "/index.php" page
