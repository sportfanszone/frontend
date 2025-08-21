import React from "react";
import { User, Shield, Clock, Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Separator } from "@/app/components/ui/separator";

import { User as UserCardUser } from "@/types";
type UserPreviewProps = {
  user: UserCardUser;
};

const UserPreview = ({ user }: UserPreviewProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getRoleColor = (role: string) => {
    return role === "admin"
      ? "bg-primary text-primary-foreground"
      : "bg-secondary text-secondary-foreground";
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">User Details</h1>
          <p className="text-muted-foreground">
            View and manage user information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="glass-card">
              <CardContent className="p-6">
                {/* Cover Photo */}
                <div
                  className="h-32 rounded-lg bg-gradient-primary mb-4 bg-cover bg-center"
                  style={{
                    backgroundImage: user.coverPhotoUrl
                      ? `url(${user.coverPhotoUrl})`
                      : undefined,
                  }}
                />

                {/* Profile Image */}
                <div className="flex justify-center -mt-16 mb-4">
                  <Avatar className="h-24 w-24 border-4 border-background shadow-elegant">
                    <AvatarImage
                      src={user.profileImageUrl || undefined}
                      alt={user.firstName}
                    />
                    <AvatarFallback className="text-lg font-semibold">
                      {getInitials(user.firstName, user.lastName)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Name and Username */}
                <div className="text-center mb-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    {user.firstName} {user.middleName && `${user.middleName} `}
                    {user.lastName}
                  </h2>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>

                {/* Status Badges */}
                <div className="flex justify-center gap-2 mb-4">
                  <Badge className={getRoleColor(user.role)}>
                    <Shield className="h-3 w-3 mr-1" />
                    {user.role}
                  </Badge>
                  <Badge className={getStatusColor(user.status)}>
                    {user.status === "active" ? (
                      <Eye className="h-3 w-3 mr-1" />
                    ) : (
                      <EyeOff className="h-3 w-3 mr-1" />
                    )}
                    {user.status}
                  </Badge>
                </div>

                {/* Quick Actions */}
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      First Name
                    </label>
                    <p className="text-foreground font-medium">
                      {user.firstName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Last Name
                    </label>
                    <p className="text-foreground font-medium">
                      {user.lastName}
                    </p>
                  </div>
                  {user.middleName && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Middle Name
                      </label>
                      <p className="text-foreground font-medium">
                        {user.middleName}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Username
                    </label>
                    <p className="text-foreground font-medium">
                      @{user.username}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email Address
                  </label>
                  <p className="text-foreground font-medium">{user.email}</p>
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Role
                    </label>
                    <div className="mt-1">
                      <Badge className={getRoleColor(user.role)}>
                        <Shield className="h-3 w-3 mr-1" />
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Account Status
                    </label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status === "active" ? (
                          <Eye className="h-3 w-3 mr-1" />
                        ) : (
                          <EyeOff className="h-3 w-3 mr-1" />
                        )}
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Information */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Activity Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Last Access
                    </label>
                    <p className="text-foreground font-medium">
                      {formatDate(user.lastAccess)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Account Created
                    </label>
                    <p className="text-foreground font-medium">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Last Updated
                    </label>
                    <p className="text-foreground font-medium">
                      {formatDate(user.updatedAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media Information */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Media Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Profile Image URL
                  </label>
                  <p className="text-foreground font-medium truncate">
                    {user.profileImageUrl || "No profile image set"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Cover Photo URL
                  </label>
                  <p className="text-foreground font-medium truncate">
                    {user.coverPhotoUrl || "No cover photo set"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreview;
