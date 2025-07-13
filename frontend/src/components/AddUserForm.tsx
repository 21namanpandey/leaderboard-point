import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  totalPoints: number;
}

interface AddUserFormProps {
  onUserAdded: (newUser: User) => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onUserAdded }) => {
  const [newUserName, setNewUserName] = useState('');

  const addUser = async () => {
    if (!newUserName.trim()) {
      toast({
        title: "Invalid name",
        description: "Please enter a valid user name",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users', { name: newUserName.trim() });
      const newUser: User = {
        id: response.data._id,
        name: response.data.name,
        totalPoints: response.data.totalPoints,
      };
      onUserAdded(newUser);
      setNewUserName('');
      toast({
        title: "User added!",
        description: `${newUser.name} has joined the arena!`,
      });
    } catch (error: any) {
      toast({
        title: "Error adding user",
        description: error.response?.data?.message || "Could not add user. Please try again.",
        variant: "destructive"
      });
      console.error('Error adding user:', error);
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-orange-200/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-4">
        <CardTitle className="text-gray-800 flex items-center gap-3 text-xl">
          <div className="p-2 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg">
            <Plus className="w-5 h-5 text-white" />
          </div>
          Add New Player
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Enter player name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 h-12 text-lg"
          onKeyPress={(e) => e.key === 'Enter' && addUser()}
        />
        <Button
          onClick={addUser}
          className="w-full h-12 bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white shadow-lg font-semibold text-lg transition-all duration-200 hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Player
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddUserForm;