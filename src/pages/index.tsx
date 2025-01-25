'use client';
import { useEffect, useState } from 'react';
import { CardImage } from '../components/Card';
import { Grid, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContect';
import { mdiAccount } from '@mdi/js';
import Icon from '@mdi/react';

interface ImageData {
  id: number;
  url: string;
  likes: number;
  dislikes: number;
}

export default function HomePage() {
  const auth = useAuth();
  const router = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState<ImageData[]>([]);

  useEffect(() => {
    if (auth?.isAuthenticated) {
      setLoading(false);
    } else {
      router('/login');
    }
  }, [auth?.isAuthenticated, router]);

  useEffect(() => {
    const fakeData = Array.from({ length: 34 }, (_, index) => ({
      id: index + 1,
      url: `http://172.28.0.2:8000/1.png`,
      likes: Math.floor(Math.random() * 100),
      dislikes: Math.floor(Math.random() * 50),
    }));
    setImageData(fakeData);
  }, []);

  if (loading || auth?.isAuthenticated === false) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      {/* Barre de navigation avec le bouton logout */}
      <Group align="right" style={{ padding: '20px' }}>
        <Button
          variant="outline"
          color="blue"
          onClick={auth?.logout}
        >
          <Icon path={mdiAccount} size={1} />
          Logout
        </Button>
      </Group>

      <Grid>
        {imageData.map((image) => (
          <Grid.Col span={4} key={image.id}>
            <CardImage
              likes={image.likes}
              dislikes={image.dislikes}
              imageUrl={image.url}
            />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}
