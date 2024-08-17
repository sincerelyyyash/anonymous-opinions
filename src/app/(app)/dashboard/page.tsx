"use client";
import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/model/user.model";
import { isAcceptingMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const { toast } = useToast();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(isAcceptingMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessage);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: axiosError.response?.data.message || "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get("/api/get-messages");
        const fetchedMessages = response.data?.messages?.[0]?.message || [];
        setMessages(fetchedMessages);
        if (refresh) {
          toast({
            title: "Refreshed Messages",
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: axiosError.response?.data.message || "Failed to fetch messages",
          variant: "destructive",
        });
      } finally {
        setIsSwitchLoading(false);
        setIsLoading(false);
      }
    },
    [setIsLoading, setMessages, toast]
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, setValue, fetchAcceptMessage, fetchMessages, toast]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: axiosError.response?.data.message || "Failed to update message settings",
        variant: "destructive",
      });
    }
  };

  if (!session || !session.user) {
    return <div className="flex justify-center items-center mt-20 flex-col">
      <h1 className="mt-20 md:mt-0 text-4xl md:text-4xl 
            font-bold bg-clip-text text-transparent 
            bg-gradient-to-b from-neutral-50 to-neutral-400">
        Please Login
      </h1>
      <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">
        Dive into the World of Anonymous opinions
      </p>
    </div>
  }

  const { username } = session.user;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "URL Copied",
      description: "Profile URL has been copied to clipboard",
    });
  };

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-black/[0.96] rounded w-full max-w-6xl mt-20">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{" "}
        <div className="flex items-center border">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? "On" : "Off"}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message._id}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
