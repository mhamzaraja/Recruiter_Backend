const db = require("../models");
const calenderConfig=require('../config/calendar.config')
const interviewSchedule=db.interviewSchedule;
const candidateProfile= db.candidateProfile;
const employerInfo = db.employerInfo
const postJob = db.postJob
const googleAuth = db.googleAuth;
const { google } = require('googleapis');
const { OAuth2 } = google.auth

exports.savescheduleInterview = async (req, res) => {

    const { summary, location, description, start, end, attendees } = req.body
    const authTokeks = await googleAuth.findOne({ where: { id: 1 } });
    
    const oAuth2Client = new OAuth2(
      calenderConfig.clientEmail,
      calenderConfig.clientPassword
    )

    if (authTokeks) {
        oAuth2Client.setCredentials({
            refresh_token: authTokeks.refresh_token,
            expiry_date: authTokeks.expiry_date
        })
    }

    oAuth2Client.refreshAccessToken((err, tokens) => {
            googleAuth.update(tokens, {
                where: { id: 1 }
            });
            oAuth2Client.setCredentials({
                refresh_token: tokens?.refresh_token,
                expiry_date: tokens?.expiry_date
            })
    });
    
    
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
    
    
    
    const event = {
      summary: summary,
      location: calenderConfig.zoomLink,
      description: description ,
      colorId: 1,
      start: {
        dateTime: start,
      },
      end: {
        dateTime: end,
      },
       attendees: [
         {email:attendees}
        ],
       calendarId:"primary",
       sendNotifications: true,
    }
    // // Check if we a busy and have an event on our calendar for the same time.
    calendar.freebusy.query(
      {
        resource: {
          timeMin: start,
        timeMax: end,
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
                interviewSchedule.create(req.body)
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

