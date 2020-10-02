from channels.generic.websocket import WebsocketConsumer
from users.models import CustomUser as User
from chat.models import Message, ChatRoom
import json
from asgiref.sync import async_to_sync
from solutions.models import Solution
from prototypetest.models import *
from prototypetest.serializers import *
from updateapi.serializers import user_personal_serializer,user_professional_serializer,bids_serializer, user_profile_serializer
# Create your views here.
from updateapi.models import User_Personal,User_Professional,bids,User_Profile,ExpertHelp

class ChatConsumer(WebsocketConsumer):
    def init_chat(self, data):
        username = data['username']
        user = User.objects.get(id = username)
        content = {
            'command' : 'init_chat'
        }
        # if not user:
        #     content['error'] = 'Unable to get or create User with username : ' + username
        # content['success'] = 'Chatting success with username : ' + username
        # self.send(text_data=json.dumps(content))
        if user:
            content['success'] = 'Chatting success with username : ' + username
            self.send(text_data=json.dumps(content))
        else:
            content['error'] = 'Unable to get or create User with username : ' + username
        

    def fetch_messages(self, data): 
        solId = data['solnId']
        author = data['username']
        choice = data['choice']
        members = []
        print(solId)
        if(choice == 'false'):
            sol = Solution.objects.get(solutionId=solId)
            members = sol.members.split(',')
            members.pop()
            room = ChatRoom.objects.filter(Solutionid=solId)

        elif(choice ==  'prototype'):
            task= createPrototypeTest.objects.get(id=solId)
            members = task.members.split(',')
            members.pop()
            # print(members)
            # print(type(members))
            room = ChatRoom.objects.filter(prototypeTest=solId)
        
        else:
            sol = ExpertHelp.objects.get(id=solId)
            members = sol.chat.split(',')
            room = ChatRoom.objects.filter(expertHelp=solId)


        if( str(author) in members ):
    
            
            id = str(room[0].roomId)
            messages = Message.objects.order_by('-created_at').filter(room=id)[:50]
            messages_list = []
            
            for message in messages:
                user = User_Personal.objects.get(username = message.author.id)
                serializers = user_personal_serializer(user)

                messages_list.append({
                    'id' : str(message.id),
                    'author' : message.author.id,
                    'content' : message.content,
                    'created_at' : str(message.created_at),
                    'img':serializers.data['img']

                })
            # ser =  []
            # for i in members:
                # user = User_Personal.objects.filter(username = i)
                # serializers = user_personal_serializer(user,many=True)
                # ser.append(serializers.data[0])
            
            content = {
                'command' : 'messages',
                'messages' : messages_list,
                # 'members' : ser,  
            }
            self.send(text_data=json.dumps(content))
        else:
            content = {
            'values' : 'not a member',
            }
            self.send(text_data=json.dumps(content))


    def new_message(self, data):
        author, text, solId,choice = data['from'], data['text'], data['solnId'], data['choice']
        members = []
        print(author)
        if(choice == 'false'):
            sol = Solution.objects.get(solutionId=solId)
            members = sol.members.split(',')
            members.pop()
            room = ChatRoom.objects.filter(Solutionid=solId)

        elif(choice ==  'prototype'):
            task= createPrototypeTest.objects.get(id=solId)
            members = task.members.split(',')
            members.pop()
            # print(members)
            # print(type(members))
            room = ChatRoom.objects.filter(prototypeTest=solId)

        else:
            sol = ExpertHelp.objects.get(id=solId)
            members = sol.chat.split(',')
            room = ChatRoom.objects.filter(expertHelp=solId)
        



        if( str(author) in members ):
    
            id = str(room[0].roomId)
            author_user = User.objects.get(id = author)
            obj = ChatRoom.objects.get(roomId=id)
            message = Message.objects.create(author=author_user, content=text,room=obj)
            user = User_Personal.objects.get(username = message.author.id)
            serializers = user_personal_serializer(user)
            print(serializers.data['img'])
            content = {
                'command' : 'new_message',
                'message' : {
                    'id' : str(message.id),
                    'author' : author,
                    'content' : message.content,
                    'created_at' : str(message.created_at),
                    'img':serializers.data['img'],
                    'soln':solId
                }
            }
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type' : 'chat_message',
                    'message' : content,
                    'room' : id
                }
            )
        else:
            content = {
            'values' : 'not a member',
            }
            self.send(text_data=json.dumps(content))

    commands = { 
        'init_chat' : init_chat,
        'fetch_messages' : fetch_messages,
        'new_message' : new_message
    }


    def connect(self):
        #solId = self.scope['url_route']['kwargs']['room_name'] #'room'
        #room = ChatRoom.objects.filter(Solutionid=solId)
        #id = str( room[0].roomId)
        #self.room_name =id
        self.room_group_name = 'chat' # + self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()
    
    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        # Receive message from WebSocket
        json_data = json.loads(text_data)
        self.commands[json_data['command']](self, json_data)

    # Receive message from room group
    def chat_message(self, event):
        # if(self.room_name == event['room']):
        message = event['message']
            

        self.send(text_data=json.dumps(message))
