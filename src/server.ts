import fastify from 'fastify'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyCors from '@fastify/cors'

import { serializerCompiler, validatorCompiler, jsonSchemaTransform, ZodTypeProvider } from 'fastify-type-provider-zod'
import { createEvent } from './routes/create-event'
import { registerForEvent } from './routes/register-for-event'
import { getEvent } from './routes/get-event'
import { getAteendeeBadge } from './routes/get-attendee-badge'
import { checkIn } from './routes/check-in'
import { getEventAttendees } from './routes/get-event-attendees'
import { errorHandler } from './error-handler'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifySwagger, {
	swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description: 'Especificações da API para o back-end da aplicação pass.in construída durante o NLW United da Rocketseat',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAteendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.setErrorHandler(errorHandler)

app.listen({ port:3333, host: '0.0.0.0' }).then(() => {
	console.log('Server is running on port 3333')
})