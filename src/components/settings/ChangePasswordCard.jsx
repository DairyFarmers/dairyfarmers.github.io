import { Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const ChangePasswordCard = ({ passwordData, onPasswordChange, onPasswordDataChange }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Lock className="h-5 w-5" />
          <CardTitle>Password Settings</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <Lock className="h-4 w-4 mr-2" />
              Change Password
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input
                  type="password"
                  value={passwordData.old_password}
                  onChange={(e) => onPasswordDataChange('old_password', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input
                  type="password"
                  value={passwordData.new_password}
                  onChange={(e) => onPasswordDataChange('new_password', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  value={passwordData.confirm_password}
                  onChange={(e) => onPasswordDataChange('confirm_password', e.target.value)}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={onPasswordChange}
                disabled={!passwordData.old_password || !passwordData.new_password || !passwordData.confirm_password}
              >
                Update Password
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};