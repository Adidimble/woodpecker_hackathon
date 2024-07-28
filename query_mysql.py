import mysql.connector
import json

# Database configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'root',
    'database': 'woodpecker'
}

# Query the database
def query_database(query):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results

# Write results to a text file
def write_to_file(data, filename='results.txt'):
    with open(filename, 'w') as file:
        file.write(json.dumps(data, indent=4))

if __name__ == '__main__':
    query = "SELECT * FROM test"  # Replace with your query
    results = query_database(query)
    write_to_file(results)
