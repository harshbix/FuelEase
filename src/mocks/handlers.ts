// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

interface MockUser {
  email: string;
  password: string;
}

const mockUsers: MockUser[] = [
  {
    email: 'test@example.com',
    password: 'password123'
  }
];

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json() as MockUser;
    
    const user = mockUsers.find(u => 
      u.email === email && u.password === password
    );

    if (!user) {
      return HttpResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      user: { email: user.email },
      token: 'mock-jwt-token'
    });
  })
];