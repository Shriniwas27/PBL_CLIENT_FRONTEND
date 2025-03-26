
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Mock data for user complaints
const userComplaints = [
  {
    id: 1,
    title: 'Issue with polling station access',
    description: 'The polling station did not have wheelchair accessibility as required by law.',
    status: 'resolved',
    submittedDate: '2023-05-15T10:30:00',
    responseDate: '2023-05-18T14:22:00',
    response: 'Thank you for bringing this to our attention. We have arranged for temporary ramps to be installed at the polling station.'
  },
  {
    id: 2,
    title: 'Voter intimidation reported',
    description: 'I witnessed a group of people outside the polling station trying to influence voters on who to vote for.',
    status: 'under-review',
    submittedDate: '2023-05-20T09:15:00',
    responseDate: null,
    response: null
  },
  {
    id: 3,
    title: 'Missing name on voter list',
    description: 'Despite having registered on time, my name was not on the voter list at my assigned polling station.',
    status: 'rejected',
    submittedDate: '2023-05-18T16:45:00',
    responseDate: '2023-05-19T11:30:00',
    response: 'After investigation, we found that you registered in a different constituency. Please check your registration details for future elections.'
  }
];

interface UserComplaintsProps {
  userId?: string; // This would be used to fetch user-specific complaints
}

const UserComplaints = ({ userId }: UserComplaintsProps) => {
  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'resolved':
        return { 
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle className="h-4 w-4 text-green-600" />
        };
      case 'under-review':
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: <Clock className="h-4 w-4 text-blue-600" />
        };
      case 'rejected':
        return { 
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <XCircle className="h-4 w-4 text-red-600" />
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <AlertCircle className="h-4 w-4 text-gray-600" />
        };
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-primary" />
          Your Complaints
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {userComplaints.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            You haven't submitted any complaints yet.
          </div>
        ) : (
          <div className="space-y-6">
            {userComplaints.map((complaint, index) => {
              const statusInfo = getStatusInfo(complaint.status);
              
              return (
                <div key={complaint.id} className="space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-medium">{complaint.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Submitted {formatDate(complaint.submittedDate)}
                      </p>
                    </div>
                    <Badge className={`${statusInfo.color} flex items-center gap-1 font-normal`}>
                      {statusInfo.icon}
                      {complaint.status === 'resolved' ? 'Resolved' : 
                       complaint.status === 'under-review' ? 'Under Review' : 'Rejected'}
                    </Badge>
                  </div>
                  
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p>{complaint.description}</p>
                  </div>
                  
                  {complaint.response && (
                    <div className="bg-primary/5 p-3 rounded-md border border-primary/10">
                      <p className="text-sm font-medium mb-1">Official Response:</p>
                      <p className="text-sm">{complaint.response}</p>
                      {complaint.responseDate && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Responded on {formatDate(complaint.responseDate)}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {index < userComplaints.length - 1 && <Separator />}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserComplaints;
