import React, { useState } from 'react';
import { Plus, Play, Pause, BookOpen, Clock, Users } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Table from '../components/UI/Table';

const Courses: React.FC = () => {
  const [courses] = useState([
    {
      id: '1',
      title: 'React Fundamentals',
      instructor: 'Sarah Wilson',
      students: 245,
      duration: '8 hours',
      status: 'Published',
      category: 'Frontend',
      price: '$99',
      rating: 4.8,
      createdDate: '2024-01-10'
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      instructor: 'Mike Johnson',
      students: 189,
      duration: '12 hours',
      status: 'Published',
      category: 'Programming',
      price: '$149',
      rating: 4.9,
      createdDate: '2023-12-15'
    },
    {
      id: '3',
      title: 'UI/UX Design Principles',
      instructor: 'Emily Davis',
      students: 156,
      duration: '6 hours',
      status: 'Draft',
      category: 'Design',
      price: '$79',
      rating: 4.7,
      createdDate: '2024-01-25'
    },
    {
      id: '4',
      title: 'Python for Beginners',
      instructor: 'John Doe',
      students: 312,
      duration: '10 hours',
      status: 'Published',
      category: 'Programming',
      price: '$129',
      rating: 4.6,
      createdDate: '2023-11-20'
    }
  ]);

  const columns = [
    {
      key: 'title',
      label: 'Course Title',
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{row.category}</p>
        </div>
      )
    },
    {
      key: 'instructor',
      label: 'Instructor',
      sortable: true
    },
    {
      key: 'students',
      label: 'Students',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <Users className="h-4 w-4 text-gray-400 mr-1" />
          {value}
        </div>
      )
    },
    {
      key: 'duration',
      label: 'Duration',
      render: (value: string) => (
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-gray-400 mr-1" />
          {value}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center">
          {value === 'Published' ? (
            <Play className="h-4 w-4 text-green-500 mr-2" />
          ) : (
            <Pause className="h-4 w-4 text-yellow-500 mr-2" />
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'Published'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          }`}>
            {value}
          </span>
        </div>
      )
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (value: string) => (
        <span className="font-medium text-gray-900 dark:text-white">{value}</span>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <span className="text-yellow-400">★</span>
          <span className="ml-1 text-sm">{value}</span>
        </div>
      )
    }
  ];

  const handleEdit = (course: any) => {
    console.log('Edit course:', course);
  };

  const handleDelete = (course: any) => {
    console.log('Delete course:', course);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Courses Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create and manage all courses on the platform
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" icon={BookOpen}>
            Import Course
          </Button>
          <Button variant="primary" icon={Plus}>
            Create Course
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Courses</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">142</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">14</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Draft</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">1,245</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Enrollments</p>
          </div>
        </Card>
      </div>

      {/* Courses Table */}
      <Table
        columns={columns}
        data={courses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Courses;