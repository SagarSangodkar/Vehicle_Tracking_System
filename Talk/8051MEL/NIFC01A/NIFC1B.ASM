;WITH 51MR / 51ME LED VERSION

;Test program for ALS-NIFC-01 Anticlock wise       

        org 9000h

        mov a,#80h              ;8255 initialisation
        mov dptr,#2043h         ;PC Cntrl address = 2043h
	movx @dptr,a
start:     
        mov a,#0dh              ;phase c switched ON
        mov dptr,#2042h         ;PC Data address = 2042h
	movx @dptr,a
        lcall delay
        mov a,#0bh              ;phase b switched ON
        mov dptr,#2042h
	movx @dptr,a
        lcall delay 
        mov a,#07h              ;phase d switched ON
        mov dptr,#2042h
	movx @dptr,a
        lcall delay
        mov a,#0eh              ;phase a switched ON
        mov dptr,#2042h
	movx @dptr,a
        lcall delay
        sjmp start              ;repeat the above procedure

delay: 
        mov  r0,#f7h        ;delay subroutine    
oloop:  mov  r1,#ffh 
iloop:  djnz r1,iloop
	djnz r0,oloop
        ret

        end

				   

				   
				   
				   

									   
