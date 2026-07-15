'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const imageUrl = formData.get('imageUrl') as string;

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

  await prisma.post.create({
    data: {
      title,
      slug,
      content,
      imageUrl: imageUrl || null,
      published: true,
    },
  });

  revalidatePath('/blog');
  revalidatePath('/dashboard/blog');
  redirect('/dashboard/blog');
}

export async function getPosts() {
  return await prisma.post.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function getPostBySlug(slug: string) {
  return await prisma.post.findUnique({
    where: { slug }
  });
}

export async function updatePost(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const imageUrl = formData.get('imageUrl') as string;

  await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      imageUrl: imageUrl || null,
    }
  });

  revalidatePath('/blog');
  revalidatePath('/dashboard/blog');
  redirect('/dashboard/blog');
}

export async function deletePost(id: string) {
  await prisma.post.delete({
    where: { id }
  });
  
  revalidatePath('/blog');
  revalidatePath('/dashboard/blog');
}

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const price = parseFloat(formData.get('price') as string);
  const description = formData.get('description') as string;
  const thumbnail = formData.get('thumbnail') as string;
  const images = formData.get('images') as string;
  const videoUrl = formData.get('videoUrl') as string;

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

  const imageArray = images ? images.split(',').map(url => url.trim()).filter(url => url !== '') : [];

  await prisma.product.create({
    data: {
      name,
      slug,
      price,
      description,
      thumbnail,
      published: true,
      images: {
        create: imageArray.map(url => ({ url }))
      },
      videos: videoUrl ? {
        create: [{ url: videoUrl }]
      } : undefined
    }
  });

  revalidatePath('/tienda');
  revalidatePath('/dashboard/productos');
  redirect('/dashboard/productos');
}

export async function getProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      images: true,
      videos: true
    }
  });
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: { slug },
    include: {
      images: true,
      videos: true
    }
  });
}

export async function updateProduct(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const price = parseFloat(formData.get('price') as string);
  const description = formData.get('description') as string;
  const thumbnail = formData.get('thumbnail') as string;
  const images = formData.get('images') as string;
  const videoUrl = formData.get('videoUrl') as string;

  const imageArray = images ? images.split(',').map(url => url.trim()).filter(url => url !== '') : [];

  await prisma.product.update({
    where: { id },
    data: {
      name,
      price,
      description,
      thumbnail,
      images: {
        deleteMany: {},
        create: imageArray.map(url => ({ url }))
      },
      videos: {
        deleteMany: {},
        create: videoUrl ? [{ url: videoUrl }] : []
      }
    }
  });

  revalidatePath('/tienda');
  revalidatePath('/dashboard/productos');
  redirect('/dashboard/productos');
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id }
  });
  
  revalidatePath('/tienda');
  revalidatePath('/dashboard/productos');
}
