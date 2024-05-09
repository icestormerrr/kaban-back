# KABAN

Kaban is a project management tool that helps the team get information about tasks, and allows the manager to track their completion.

# Deployment

### Production

1. Clone the repository:
   - git clone
2. Create a .env file in the root
3. Launch docker-compose:
   - docker-compose up -d

### Development

1. Ensure that Node.js and MongoDB are installed on your computer
2. Clone the repository:
   - git clone
3. Create a .env file in the root
4. Install dependencies:
   - npm install
5. Start the project:
   - npm run dev

### Example of .env file:
      PORT=4000
      DB_URL=mongodb://mongodb:27017/kaban
      CLIENT_URL=http://localhost:3000
      JWT_ACCESS_SECRET_KEY=some-secret-key-1
      JWT_REFRESH_SECRET_KEY=some-secret-key-2