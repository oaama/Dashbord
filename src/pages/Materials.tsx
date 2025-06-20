import React, { useState } from 'react';
import { Plus, Upload, Download, FileText, Video, Image } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Table from '../components/UI/Table';

const Materials: React.FC = () => {
  const [materials] = useState([
    {
      id: '1',
      name: 'React Components Guide.pdf',
      type: 'PDF',
      course: 'React Fundamentals',
      size: '2.5 MB',
      uploadDate: '2024-01-15',
      downloads: 156,
      status: 'Published'
    },
    {
      id: '2',
      name: 'JavaScript Advanced - Video 1.mp4',
      type: 'Video',
      course: 'Advanced JavaScript',
      size: '45.2 MB',
      uploadDate: '2024-01-12',
      downloads: 89,
      status: 'Published'
    },
    {
      id: '3',
      name: 'Design Wireframes.sketch',
      type: 'Design',
      course: 'UI/UX Design Principles',
      size: '12.8 MB',
      uploadDate: '2024-01-10',
      downloads: 67,
      status: 'Draft'
    },
    {
      id: '4',
      name: 'Python Cheat Sheet.png',
      type: 'Image',
      course: 'Python for Beginners',
      size: '1.2 MB',
      uploadDate: '2024-01-08',
      downloads: 234,
      status: 'Published'
    }
  ]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <Video className="h-4 w-4 text-red-500" />;
      case 'Image':
        return <Image className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4 text-blue-500" />;
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'File Name',
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center">
          <div className="mr-3">
            {getFileIcon(row.type)}
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{row.size}</p>
          </div>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Video' 
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            : value === 'Image'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'course',
      label: 'Course',
      sortable: true
    },
    {
      key: 'downloads',
      label: 'Downloads',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <Download className="h-4 w-4 text-gray-400 mr-1" />
          {value}
        </div>
      )
    },
    {
      key: 'uploadDate',
      label: 'Upload Date',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Published'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const handleEdit = (material: any) => {
    console.log('Edit material:', material);
  };

  const handleDelete = (material: any) => {
    console.log('Delete material:', material);
  };

  const handleUpload = () => {
    console.log('Upload new material');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Materials Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Upload and manage course materials and resources
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" icon={Download}>
            Export All
          </Button>
          <Button variant="primary" icon={Upload} onClick={handleUpload}>
            Upload Material
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">1,234</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Materials</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Video className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">456</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Videos</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">678</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Documents</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Download className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">12.5K</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Downloads</p>
          </div>
        </Card>
      </div>

      {/* Upload Area */}
      <Card>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Upload Course Materials
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Drag and drop files here, or click to browse
          </p>
          <Button variant="primary" icon={Plus}>
            Choose Files
          </Button>
        </div>
      </Card>

      {/* Materials Table */}
      <Table
        columns={columns}
        data={materials}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Materials;