import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Filter,
  MessageSquare,
  MoreHorizontal,
  Search,
  Star,
  Trash2,
} from "lucide-react";

import { useConversations } from "@/api/hooks";
import { Conversation } from "@/mock_data/conversationsPage";

const ConversationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { conversations, stats, isLoading } = useConversations();

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.user.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      conversation.user.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  // Status badge component
  const StatusBadge = ({ status }: { status: Conversation["status"] }) => {
    const variants = {
      active: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      completed:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      abandoned: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };

    return (
      <Badge className={variants[status]} variant="outline">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Satisfaction rating component
  const SatisfactionRating = ({ rating }: { rating: number | null }) => {
    if (rating === null)
      return <span className="text-muted-foreground">N/A</span>;

    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
          <p className="text-muted-foreground">
            Monitor and analyze user conversations with your AI assistant.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            View Active
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Conversation History</CardTitle>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search conversations..."
                  className="pl-8 w-full md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Messages</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Satisfaction</TableHead>
                  <TableHead>Last Message</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Loading conversations...
                    </TableCell>
                  </TableRow>
                ) : filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => (
                    <TableRow key={conversation.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={conversation.user.avatar}
                              alt={conversation.user.name}
                            />
                            <AvatarFallback>
                              {conversation.user.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {conversation.user.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {conversation.user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={conversation.status} />
                      </TableCell>
                      <TableCell>{conversation.messages}</TableCell>
                      <TableCell>{conversation.duration}</TableCell>
                      <TableCell>
                        <SatisfactionRating
                          rating={conversation.satisfaction}
                        />
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {conversation.lastMessage}
                      </TableCell>
                      <TableCell>{conversation.timestamp}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View conversation
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              View user profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Export transcript
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete conversation
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No conversations found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">
                {filteredConversations.length}
              </span>{" "}
              of{" "}
              <span className="font-medium">
                {stats?.total || filteredConversations.length}
              </span>{" "}
              conversations
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="min-w-8 px-3 font-medium"
              >
                {currentPage}
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={filteredConversations.length < 10}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationsPage;
