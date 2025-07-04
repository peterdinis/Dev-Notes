"use client"

import { useState } from "react";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { Plus, Clock, Users, MapPin, Trash2, Calendar as CalendarIcon, Badge } from "lucide-react";
import { format } from "date-fns";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  type: 'meeting' | 'deadline' | 'reminder' | 'event';
  attendees?: string;
  location?: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Team Standup',
    description: 'Daily team sync meeting',
    date: new Date(),
    time: '09:00',
    type: 'meeting',
    attendees: 'Alice, Bob, Carol',
    location: 'Conference Room A'
  },
  {
    id: '2',
    title: 'Project Deadline',
    description: 'Submit final project proposal',
    date: new Date(Date.now() + 86400000), // Tomorrow
    time: '17:00',
    type: 'deadline'
  }
];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    time: '',
    type: 'meeting',
    attendees: '',
    location: ''
  });

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'deadline':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'reminder':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'event':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.time && selectedDate) {
      const event: Event = {
        id: Date.now().toString(),
        title: newEvent.title,
        description: newEvent.description || '',
        date: selectedDate,
        time: newEvent.time,
        type: newEvent.type as Event['type'],
        attendees: newEvent.attendees,
        location: newEvent.location
      };
      
      setEvents([...events, event]);
      setNewEvent({
        title: '',
        description: '',
        time: '',
        type: 'meeting',
        attendees: '',
        location: ''
      });
      setIsAddingEvent(false);
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="container mx-auto p-4 lg:p-6 space-y-6 animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Calendar</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your schedule and events</p>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 gap-6">
        {/* Calendar - Made larger */}
        <div className="xl:col-span-3 lg:col-span-2">
          <Card className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Calendar</span>
                <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
                  <DialogTrigger asChild>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                      <Plus className="w-4 h-4" />
                      Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Event</DialogTitle>
                      <DialogDescription>
                        Create a new event for {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="title"
                          value={newEvent.title}
                          onChange={(e: { target: { value: any; }; }) => setNewEvent({...newEvent, title: e.target.value})}
                          className="col-span-3"
                          placeholder="Event title"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time" className="text-right">
                          Time
                        </Label>
                        <Input
                          id="time"
                          type="time"
                          value={newEvent.time}
                          onChange={(e: { target: { value: any; }; }) => setNewEvent({...newEvent, time: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                          Type
                        </Label>
                        <Select 
                          value={newEvent.type} 
                          onValueChange={(value) => setNewEvent({...newEvent, type: value as Event['type']})}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="meeting">Meeting</SelectItem>
                            <SelectItem value="deadline">Deadline</SelectItem>
                            <SelectItem value="reminder">Reminder</SelectItem>
                            <SelectItem value="event">Event</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="attendees" className="text-right">
                          Attendees
                        </Label>
                        <Input
                          id="attendees"
                          value={newEvent.attendees}
                          onChange={(e: { target: { value: any; }; }) => setNewEvent({...newEvent, attendees: e.target.value})}
                          className="col-span-3"
                          placeholder="Comma separated names"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={newEvent.location}
                          onChange={(e: { target: { value: any; }; }) => setNewEvent({...newEvent, location: e.target.value})}
                          className="col-span-3"
                          placeholder="Meeting location"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          value={newEvent.description}
                          onChange={(e: { target: { value: any; }; }) => setNewEvent({...newEvent, description: e.target.value})}
                          className="col-span-3"
                          placeholder="Event description"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleAddEvent}>
                        Add Event
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border w-full text-lg [&_.rdp-cell]:h-16 [&_.rdp-cell]:w-16 [&_.rdp-button]:h-14 [&_.rdp-button]:w-14 [&_.rdp-button]:text-base"
              />
            </CardContent>
          </Card>
        </div>

        {/* Events for Selected Date - Adjusted for new layout */}
        <div className="xl:col-span-1 lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
              </CardTitle>
              <CardDescription>
                {selectedDateEvents.length > 0 
                  ? `${selectedDateEvents.length} event${selectedDateEvents.length > 1 ? 's' : ''} scheduled`
                  : 'No events scheduled'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map((event, index) => (
                    <div key={event.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg animate-fade-in-up" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900 dark:text-slate-100">{event.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">{event.time}</span>
                            <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                              {event.type}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {event.description && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{event.description}</p>
                      )}
                      
                      {event.attendees && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Users className="w-3 h-3" />
                          <span>{event.attendees}</span>
                        </div>
                      )}
                      
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No events for this date</p>
                    <p className="text-sm">Click "Add Event" to schedule something</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;