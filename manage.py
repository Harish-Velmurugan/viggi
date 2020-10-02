#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import django 
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ssp.settings")
django.setup()
from post.models import Post
from post.serializers import PostSerializer2
from datetime import datetime
import time
from apscheduler.schedulers.background import BackgroundScheduler
from multiprocessing import Process
import time,threading
# from post.tasks import demo_task
'''
import ray
ray.init()
@ray.remote '''
def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ssp.settings')
    try:
        from django.core.management import execute_from_command_line
        
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)
   
    
#@ray.remote
def server():
    scheduler = BackgroundScheduler()
    scheduler.add_job(expired, 'interval', seconds=3)
    scheduler.start()

    try:
        # This is here to simulate application activity (which keeps the main thread alive).
        while True:
            time.sleep(2)
    except (KeyboardInterrupt, SystemExit):
        # Not strictly necessary if daemonic mode is enabled but should be done if possible
        scheduler.shutdown()
   
def expired():
    # j=0
    # while True:              
    try:    
        task = Post.objects.all()   
        now = datetime.now().date()
        # j=j+1   
        for i in task:
            if(i.deadline.date() < now and i.expired == False):
                i.expired = True
                i.save()

    except:
        print("Except")
    finally:
        threading.Timer(3,expired).start()
    # pass

  
if __name__ == '__main__':

    # p1 = Process(target=main)
    # p1.start()
    # p2 = Process(target=expired)
    # p2.start()
    # p1.join()
    # p2.join()
    main()