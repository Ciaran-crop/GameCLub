#
# Autogenerated by Thrift Compiler (0.16.0)
#
# DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
#
#  options string: py
#

from thrift.Thrift import TType, TMessageType, TFrozenDict, TException, TApplicationException
from thrift.protocol.TProtocol import TProtocolException
from thrift.TRecursive import fix_spec

import sys

from thrift.transport import TTransport
all_structs = []


class Player(object):
    """
    Attributes:
     - uuid
     - name
     - channel_name
     - score
     - waiting_time
     - x
     - y
     - photo
     - email

    """


    def __init__(self, uuid=None, name=None, channel_name=None, score=None, waiting_time=None, x=None, y=None, photo=None, email=None,):
        self.uuid = uuid
        self.name = name
        self.channel_name = channel_name
        self.score = score
        self.waiting_time = waiting_time
        self.x = x
        self.y = y
        self.photo = photo
        self.email = email

    def read(self, iprot):
        if iprot._fast_decode is not None and isinstance(iprot.trans, TTransport.CReadableTransport) and self.thrift_spec is not None:
            iprot._fast_decode(self, iprot, [self.__class__, self.thrift_spec])
            return
        iprot.readStructBegin()
        while True:
            (fname, ftype, fid) = iprot.readFieldBegin()
            if ftype == TType.STOP:
                break
            if fid == 1:
                if ftype == TType.STRING:
                    self.uuid = iprot.readString().decode('utf-8', errors='replace') if sys.version_info[0] == 2 else iprot.readString()
                else:
                    iprot.skip(ftype)
            elif fid == 2:
                if ftype == TType.STRING:
                    self.name = iprot.readString().decode('utf-8', errors='replace') if sys.version_info[0] == 2 else iprot.readString()
                else:
                    iprot.skip(ftype)
            elif fid == 3:
                if ftype == TType.STRING:
                    self.channel_name = iprot.readString().decode('utf-8', errors='replace') if sys.version_info[0] == 2 else iprot.readString()
                else:
                    iprot.skip(ftype)
            elif fid == 4:
                if ftype == TType.I32:
                    self.score = iprot.readI32()
                else:
                    iprot.skip(ftype)
            elif fid == 5:
                if ftype == TType.I32:
                    self.waiting_time = iprot.readI32()
                else:
                    iprot.skip(ftype)
            elif fid == 6:
                if ftype == TType.DOUBLE:
                    self.x = iprot.readDouble()
                else:
                    iprot.skip(ftype)
            elif fid == 7:
                if ftype == TType.DOUBLE:
                    self.y = iprot.readDouble()
                else:
                    iprot.skip(ftype)
            elif fid == 8:
                if ftype == TType.STRING:
                    self.photo = iprot.readString().decode('utf-8', errors='replace') if sys.version_info[0] == 2 else iprot.readString()
                else:
                    iprot.skip(ftype)
            elif fid == 9:
                if ftype == TType.STRING:
                    self.email = iprot.readString().decode('utf-8', errors='replace') if sys.version_info[0] == 2 else iprot.readString()
                else:
                    iprot.skip(ftype)
            else:
                iprot.skip(ftype)
            iprot.readFieldEnd()
        iprot.readStructEnd()

    def write(self, oprot):
        if oprot._fast_encode is not None and self.thrift_spec is not None:
            oprot.trans.write(oprot._fast_encode(self, [self.__class__, self.thrift_spec]))
            return
        oprot.writeStructBegin('Player')
        if self.uuid is not None:
            oprot.writeFieldBegin('uuid', TType.STRING, 1)
            oprot.writeString(self.uuid.encode('utf-8') if sys.version_info[0] == 2 else self.uuid)
            oprot.writeFieldEnd()
        if self.name is not None:
            oprot.writeFieldBegin('name', TType.STRING, 2)
            oprot.writeString(self.name.encode('utf-8') if sys.version_info[0] == 2 else self.name)
            oprot.writeFieldEnd()
        if self.channel_name is not None:
            oprot.writeFieldBegin('channel_name', TType.STRING, 3)
            oprot.writeString(self.channel_name.encode('utf-8') if sys.version_info[0] == 2 else self.channel_name)
            oprot.writeFieldEnd()
        if self.score is not None:
            oprot.writeFieldBegin('score', TType.I32, 4)
            oprot.writeI32(self.score)
            oprot.writeFieldEnd()
        if self.waiting_time is not None:
            oprot.writeFieldBegin('waiting_time', TType.I32, 5)
            oprot.writeI32(self.waiting_time)
            oprot.writeFieldEnd()
        if self.x is not None:
            oprot.writeFieldBegin('x', TType.DOUBLE, 6)
            oprot.writeDouble(self.x)
            oprot.writeFieldEnd()
        if self.y is not None:
            oprot.writeFieldBegin('y', TType.DOUBLE, 7)
            oprot.writeDouble(self.y)
            oprot.writeFieldEnd()
        if self.photo is not None:
            oprot.writeFieldBegin('photo', TType.STRING, 8)
            oprot.writeString(self.photo.encode('utf-8') if sys.version_info[0] == 2 else self.photo)
            oprot.writeFieldEnd()
        if self.email is not None:
            oprot.writeFieldBegin('email', TType.STRING, 9)
            oprot.writeString(self.email.encode('utf-8') if sys.version_info[0] == 2 else self.email)
            oprot.writeFieldEnd()
        oprot.writeFieldStop()
        oprot.writeStructEnd()

    def validate(self):
        return

    def __repr__(self):
        L = ['%s=%r' % (key, value)
             for key, value in self.__dict__.items()]
        return '%s(%s)' % (self.__class__.__name__, ', '.join(L))

    def __eq__(self, other):
        return isinstance(other, self.__class__) and self.__dict__ == other.__dict__

    def __ne__(self, other):
        return not (self == other)
all_structs.append(Player)
Player.thrift_spec = (
    None,  # 0
    (1, TType.STRING, 'uuid', 'UTF8', None, ),  # 1
    (2, TType.STRING, 'name', 'UTF8', None, ),  # 2
    (3, TType.STRING, 'channel_name', 'UTF8', None, ),  # 3
    (4, TType.I32, 'score', None, None, ),  # 4
    (5, TType.I32, 'waiting_time', None, None, ),  # 5
    (6, TType.DOUBLE, 'x', None, None, ),  # 6
    (7, TType.DOUBLE, 'y', None, None, ),  # 7
    (8, TType.STRING, 'photo', 'UTF8', None, ),  # 8
    (9, TType.STRING, 'email', 'UTF8', None, ),  # 9
)
fix_spec(all_structs)
del all_structs
