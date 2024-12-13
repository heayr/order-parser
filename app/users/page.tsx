import React from 'react'
import type { Metadata } from 'next'
import getAllUsers from '@/lib/getAllUsers'
import Link from 'next/link'
import { log } from 'console'

export const metadata: Metadata = {
  title: 'Пользователи',
  description: 'Страница пользователей',
}

export default async function UsersPage() {
    const usersData: Promise<User[]> = getAllUsers();
    const users = await usersData;
    console.log('Hello ');
    
    const content = (
        <section key={users.id}>
            <h2><Link href="/">На главную</Link></h2>
            <br />
            {users.map(user =>{
                return (
                    <>
                        <p key={user.id}>
                            <Link href={`/users/${user.id}`} >{user.name}</Link>
                        </p>
                        <br />
                    </>
                )
            })}
        </section>
    )
  return content
  
}
