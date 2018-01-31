#!/usr/bin/python

import os
import sys
#HOME_DIR=os.path.dirname(__file__)
#sys.path.append(HOME_DIR)
#os.chdir(HOME_DIR)
import json
from bottle import get, post, put, route, app, run, request, response, hook, error, abort
from tinydb import TinyDB, Query
app = app()
db = TinyDB('pto.json')
table = db.table('pto')

@get('/')
def test():
    return 'It works!'


@route(r'/<:re:.*>', method=['OPTIONS'])
def options_method():
    enable_cors()
    response.status = 200

@route(r'/api/pto', method='GET')
def all_pto():
    return table.all()

@hook('after_request')
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

@error(500)
@error(400)
def handle_error(error):
    response.content_type = 'application/json'
    return json.dumps({'status':'ERROR', 'error':error.body})

if __name__ == '__main__':
    run(app, reloader=True, port=8000)

else:
    application = app
