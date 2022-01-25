Feature: Demo feature


    Scenario Outline: Search Kasas in at least three different locations including Austin, TX
        Given Kasa page is opened
        When Search with <searchItem>  
        Then Display searching results
       
        Examples:
            | TestID     | searchItem    |
            | DEMO_TC001 | Austin, TX    |
            | DEMO_TC002 | Dallas, TX    |
            | DEMO_TC003 | Arlington, TX |


    Scenario Outline: Check if our system does not allow guests to book a single-night stay at all searched locations

        Given Kasa page is opened
        When Search with <searchItem>
        Then Pick dates
        Then Display searching results
        Then Not allowed book property for single-night

        Examples:
            | TestID     | searchItem    |
            | DEMO_TC004 | Austin, TX    |
            | DEMO_TC005 | Dallas, TX    |
            | DEMO_TC006 | Arlington, TX |


    Scenario Outline: Bookings can be only made on a future date

        Given Kasa page is opened
        When Search with <searchItem>
        Then Not allowed book on past date <pastDate>


        Examples:
            | TestID     | searchItem | pastDate |
            | DEMO_TC007 | Austin, TX | 2022-01-12 |

    @demo
    Scenario Outline: Checks if a selected Kasa has "Heating" in the amenities list
        Given Kasa page is opened
        When Search with <searchItem>
        Then Pick dates
        Then Display searching results
        Then Heating in the amenities

        Examples:
            | TestID     | searchItem    |
            | DEMO_TC008 | Austin, TX    |
            | DEMO_TC009 | Dallas, TX    |
            | DEMO_TC010 | Arlington, TX |
