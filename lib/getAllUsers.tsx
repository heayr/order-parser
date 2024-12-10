import React from 'react'

export default function getAllUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')

    if (!res.ok) {
        throw new Error(`не получил пользователей! status: ${res.status}`)
    }
  return res.json()
}
