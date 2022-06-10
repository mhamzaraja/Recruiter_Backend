const db = require("../models");
const calenderConfig=require('../config/calendar.config')
const interviewSchedule=db.interviewSchedule;
const candidateProfile= db.candidateProfile;
const employerInfo = db.employerInfo
const postJob=db.postJob
const { google } = require('googleapis');
const { OAuth2 } = google.auth

exports.savescheduleInterview = async (req, res) => {

    const {Summary,Location,Description,start,end,Attendees}=req.body
    
    const oAuth2Client = new OAuth2(
      calenderConfig.clientEmail,
      calenderConfig.clientPassword
    )
    
    oAuth2Client.setCredentials({
      refresh_token: calenderConfig.refreshToken,
    })
    
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
    
    // const eventStartTime = new Date();
    // eventStartTime.setDate(eventStartTimess)
    // console.log("event start date",eventStartTime,eventStartTime.getDay());
    
    // const eventEndTime = new Date()
    // eventEndTime.setDate(eventEndTime.getDay() + 13)
    // eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)
    
    // Create a dummy event for temp uses in our calendar
    
    const event = {
      summary: Summary,
      location: calenderConfig.zoomLink,
      description: Description ,
      colorId: 1,
      start: {
        dateTime: start.startTime,
        timeZone: 'Asia/Karachi',
      },
      end: {
        dateTime: end.endTime,
        timeZone: 'Asia/Karachi',
      },
       attendees: [
         {email:Attendees}
        ],
       calendarId:"primary",
       sendNotifications: true,
    }
    // Check if we a busy and have an event on our calendar for the same time.
    calendar.freebusy.query(
      {
        resource: {
          timeMin: start.startTime,
          timeMax: end.endTime,
          timeZone: 'Asia/Karachi',
          items: [{ id: 'primary' }],
        },
      },
      (err, response) => {
        if (err) return console.error('Free Busy Query Error: ', err)
    
        const eventArr = response.data.calendars.primary.busy
        console.log(eventArr);
        if (eventArr.length === 0)
          return calendar.events.insert(
            { calendarId: 'primary',sendNotifications: true,resource: event },
            err => {
              if (err) return console.error('Error Creating Calender Event:', err)
              else {
                interviewSchedule.create(event)
                .then(data => {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        message: "Created Successfully",
                        data: data
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        status: 500,
                        success: false,
                        message: err.message || "Something Went wrong while requesting!"
                    });
                });
              }
            }
          )
    
        // If event array is not empty log that we are busy.
        return res.status(500).json({
            success:false,
            message:"sorry I'm busy ..."
        })
      }
    )
}

exports.showscheduleInterviewById = async (req, res) => {
    const interviewId = req.query.id;
   
    await interviewSchedule.findAll({
        where: { jobId },
        include: [candidateProfile, postJob,employerInfo]
    }).then(data => {
        if (data.length > 0){
            res.status(200).json({
                status: 200,
                success: true,
                data: data
            });
        } else {
            res.status(500).json({
                status: 500,
                success: false
            });
        }
        
    })
        .catch(err => {
            res.status(500).json({
                status: 500,
                success: false,
                message: err.message || "Something Went wrong while requesting!"
            });
        });
};

exports.showAllscheduleInterview = async (req, res) => {
    const jobId = req.query.id;

    await interviewSchedule.findAll({
        include: [candidateProfile, postJob,employerInfo]
    }).then(data => {
        if (data.length > 0){
            res.status(200).json({
                status: 200,
                success: true,
                data: data
            });
        } else {
            res.status(500).json({
                status: 500,
                success: false,
                message: "No jobs were posted with this id: " + jobId
            });
        }
        
    })
        .catch(err => {
            res.status(500).json({
                status: 500,
                success: false,
                message: err.message || "Something Went wrong while requesting!"
            });
        });
};

exports.updatescheduleInterview = async (req, res) => {
    const id = req.query.id;

    const {
        date,
        time,
        city,
        comments,
        status
    } = req.body;

    try {
        const interviewUpdate = await interviewSchedule.findOne({
            where: { id }
        });
        interviewUpdate.date = date;
        interviewUpdate.time = time;
        interviewUpdate.city = city;
        interviewUpdate.comments = comments;
        interviewUpdate.status = status

        await interviewSchedule.save().then(data => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Updated Successfully",
                data: data
            });
        })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    success: false,
                    message: err.message || "Something Went wrong while requesting!"
                });
            });
    } catch (err) {
        res.status(500).json({
            status: 500,
            success: false,
            message: err.message || "Something Went wrong while requesting!"
        });
    }
};

