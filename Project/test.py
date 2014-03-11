import serial

#####Global Variables######################################
#be sure to declare the variable as 'global var' in the fxn
ser = 0

#####FUNCTIONS#############################################
#initialize serial connection 
def init_serial():
    COMNUM = 29 #set you COM port # here
    global ser #must be declared in each fxn used
    ser = serial.Serial()
    ser.baudrate = 9600
    ser.port = COMNUM - 1 #starts at 0, so subtract 1
    #ser.port = '/dev/ttyUSB0' #uncomment for linux

    #you must specify a timeout (in seconds) so that the
    # serial port doesn't hang
    ser.timeout = 1
    ser.open() #open the serial port

    # print port open or closed
    if ser.isOpen():
        print 'Open: ' + ser.portstr
#####SETUP################################################
#this is a good spot to run your initializations 
init_serial()

#####MAIN LOOP############################################
while 1:
    #prints what is sent in on the serial port
    temp = raw_input('Type what you want to send, hit enter:\n\r')
    ser.write(temp) #write to the serial port
    bytes = ser.readline() #reads in bytes followed by a newline 
    print 'You sent: ' + bytes #print to the console
    break #jump out of loop 
